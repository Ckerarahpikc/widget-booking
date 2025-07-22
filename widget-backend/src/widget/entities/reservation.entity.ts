import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'datetime' })
  start_time: Date;

  @Column({ type: 'datetime' })
  end_time: Date;

  @Column({
    type: 'enum',
    enum: [
      'CANCELLED',
      'CLOSED',
      'CONFIRMED',
      'CONFIRMED_PREORDER',
      'DISHONORED',
      'PENDING',
      'PENDING_PREORDER',
      'REJECTED',
      'SERVE',
      'SERVE_PREORDER',
    ],
  })
  status: string;

  @Column()
  guests_number: number;

  @Column({ nullable: true })
  reason: string;

  @Column()
  restaurant_id: string;

  @Column({ nullable: true })
  user_id: string;
}
