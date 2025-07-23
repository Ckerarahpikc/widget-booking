import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from './entities/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingConfirmation } from './entities/booking_confirmation.entity';
import { MailService } from '../mail/mail.service';
import { generateToken } from '../common/utils/generateToken';

@Injectable()
export class WidgetService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,

    @InjectRepository(BookingConfirmation)
    private readonly bookingConfirmationRepo: Repository<BookingConfirmation>,

    private readonly mailService: MailService,
  ) {}

  async createBooking(dto: CreateBookingDto) {
    // check user
    const user = await this.userRepo.findOne({ where: { email: dto.email } });

    if (user) {
      // handle send message to user's (via twilio i guess)
      const startTime = new Date(`${dto.date}T${dto.time}`);
      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // +2h

      const reservation = this.reservationRepo.create({
        date: new Date(dto.date),
        start_time: startTime,
        end_time: endTime,
        status: 'CONFIRMED',
        guests_number: dto.guests,
        reason: dto.specialRequests,
        restaurant_id: dto.businessId,
        user_id: user.id,
      });

      const saved = await this.reservationRepo.save(reservation);

      return {
        success: true,
        bookingId: `WB-${saved.id.slice(0, 8)}`,
        status: saved.status.toLowerCase(),
        message: 'Booking confirmed successfully',
      };
    } else {
      // generate id
      const token = generateToken();

      // make a booking confirmation and save it
      await this.bookingConfirmationRepo.save({
        email: dto.email,
        confirmationToken: token,
        confirmationSentAt: new Date(),
        confirmationSendCount: 1,
        isConfirmed: false,
        pendingReservationData: dto,
      });

      // handle send reserv verification via email provided
      await this.mailService.sendBookingConfirmation({
        email: dto.email,
        name: dto.name,
        // details are sending along with mail provider
        bookingDetails: `Please confirm your booking: ${process.env.URL_BASE}/api/widget/booking/confirm/${token}`,
      });

      return {
        success: true,
        message:
          'Confirmation email sent. Please check your inbox to confirm booking.',
      };
    }
  }

  // this will handle confirmation sended via token
  async handleBookingConfirmation(token: string) {
    const confirmation = await this.bookingConfirmationRepo.findOne({
      where: { confirmationToken: token },
    });

    console.log('CONFIRMATION:', confirmation, confirmation?.isConfirmed);

    if (
      !confirmation ||
      confirmation.isConfirmed ||
      !confirmation.pendingReservationData
    ) {
      throw new NotFoundException('Invalid or already used token');
    }

    const dto: CreateBookingDto = confirmation.pendingReservationData;

    const startTime = new Date(`${dto.date}T${dto.time}`);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    const reservation = this.reservationRepo.create({
      date: new Date(dto.date),
      start_time: startTime,
      end_time: endTime,
      status: 'CONFIRMED',
      guests_number: dto.guests,
      reason: dto.specialRequests,
      restaurant_id: dto.businessId,
      /* very important:

      in this case the user id will be generated (meaning we do not have that user inside database), so here we also should create not only the user_id but the user itself so that the id from the reservation will match with the real user id not just junk hard coded ids
      */
      user_id: generateToken(),
    });

    const saved = await this.reservationRepo.save(reservation);

    // rewriting the database
    confirmation.isConfirmed = true;
    confirmation.reservationId = saved.id;
    await this.bookingConfirmationRepo.save(confirmation); // and save it here

    return {
      success: true,
      bookingId: `WB-${saved.id.slice(0, 8)}`,
      status: saved.status.toLowerCase(),
      message: 'Booking confirmed successfully via email verification',
    };
  }
}
