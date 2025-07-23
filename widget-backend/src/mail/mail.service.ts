import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { SendBookingConfirmationDto } from './dto/send-booking-confirmation.dto';

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: getEnvOrThrow('MAIL_HOST'),
    port: +getEnvOrThrow('MAIL_PORT'),
    secure: true,
    auth: {
      user: getEnvOrThrow('SMTP_USERNAME'),
      pass: getEnvOrThrow('SMTP_PASSWORD').replace(/^'|'$/g, ''),
    },
  });

  async sendBookingConfirmation(
    dto: SendBookingConfirmationDto,
  ): Promise<void> {
    const { email, name, bookingDetails } = dto;

    await this.transporter.sendMail({
      from: `"EasyReserv" <${getEnvOrThrow('SMTP_USERNAME')}>`,
      to: email,
      subject: 'Confirmarea rezervării',
      text: `Salut ${name},\n\nRezervarea ta: ${bookingDetails}\n\nTe rugăm să confirmi.`,
      html: `<p>Salut ${name},</p><p>Rezervarea ta: ${bookingDetails}</p><p><b>Te rugăm să confirmi.</b></p>`,
    });
  }
}
