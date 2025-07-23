import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('booking_confirmation')
export class BookingConfirmation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reservation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @Column({ name: 'reservation_id', nullable: true })
  reservationId: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ unique: true })
  confirmationToken: string;

  @Column({ type: 'timestamp' })
  confirmationSentAt: Date;

  @Column({ default: 1 })
  confirmationSendCount: number;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ type: 'json' })
  pendingReservationData: any;
}
