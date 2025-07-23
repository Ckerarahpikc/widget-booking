import { Module } from '@nestjs/common';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from './entities/user.entity';
import { BookingConfirmation } from './entities/booking_confirmation.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Reservation, BookingConfirmation]),
    MailModule,
  ],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}
