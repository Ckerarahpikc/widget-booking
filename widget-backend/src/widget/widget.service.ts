import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class WidgetService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async createBooking(dto: CreateBookingDto) {
    const startTime = new Date(`${dto.date}T${dto.time}`);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // +2h

    const reservation = this.reservationRepo.create({
      date: new Date(dto.date),
      start_time: startTime,
      end_time: endTime,
      status: 'PENDING',
      guests_number: dto.guests,
      reason: dto.specialRequests,
      restaurant_id: dto.businessId,
      user_id: uuidv4(),
    });

    const saved = await this.reservationRepo.save(reservation);

    return {
      success: true,
      bookingId: `WB-${saved.id.slice(0, 8)}`,
      status: saved.status.toLowerCase(),
      message: 'Booking confirmed successfully',
    };
  }
}
