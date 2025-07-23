import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum UserRole {
  SUPER_ADMIN_EASYRESERV = 'SUPER_ADMIN_EASYRESERV',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  BARTENDER = 'BARTENDER',
  CHEF = 'CHEF',
  DRIVER = 'DRIVER',
  HOSTESS = 'HOSTESS',
  OPERATOR = 'OPERATOR',
  SOUS_CHEF = 'SOUS_CHEF',
  SPECIALIST = 'SPECIALIST',
  SUPER_HOSTESS = 'SUPER_HOSTESS',
  WAITER = 'WAITER',
  COURIER = 'COURIER',
  STAFF_ACCESS_CONTROL = 'STAFF_ACCESS_CONTROL',
  GENERAL = 'GENERAL',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', precision: 6 })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', precision: 6, nullable: true })
  deletedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 255, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @Column({ name: 'restaurant_id', type: 'varchar', nullable: true })
  restaurantId: string;

  @Column({ name: 'place_id', type: 'varchar', nullable: true })
  placeId: string;

  @Column({ name: 'is_verified', type: 'tinyint', default: 0 })
  isVerified: boolean;

  @Column({ name: 'is_vip', type: 'tinyint', default: 0 })
  isVip: boolean;

  @Column({ name: 'language', type: 'enum', enum: ['en', 'ro', 'ru'], default: 'ro' })
  language: string;

  @Column({ name: 'is_google_auth', type: 'tinyint', default: 0 })
  isGoogleAuth: boolean;

  @Column({ name: 'is_apple_auth', type: 'tinyint', default: 0 })
  isAppleAuth: boolean;

  @Column({ name: 'salary', type: 'int', nullable: true })
  salary: number;

  @Column({ name: 'salary_type', type: 'enum', enum: ['MONTHLY', 'HOURLY'], nullable: true })
  salaryType: string;

  @Column({ type: 'enum', enum: ['USD', 'EUR', 'MDL', 'RON'], nullable: true })
  currency: string;

  @Column({ type: 'varchar', nullable: true })
  department: string;

  @Column({ name: 'role_name', type: 'varchar', nullable: true })
  roleName: string;

  @Column({ name: 'waiter_code', type: 'varchar', nullable: true })
  waiterCode: string;

  @Column({ name: 'current_schedule_id', type: 'varchar', nullable: true })
  currentScheduleId: string;

  @Column({ name: 'created_by', type: 'varchar', nullable: true })
  createdBy: string;

  @Column({ name: 'date_of_birth', type: 'varchar', nullable: true })
  dateOfBirth: string;
}
