import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsString() businessId: string;
  @IsString() businessType: string;
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsString() date: string;
  @IsString() time: string;
  @IsNumber() guests: number;
  @IsOptional() @IsString() specialRequests?: string;
}
