import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendBookingConfirmationDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  bookingDetails: string;
}