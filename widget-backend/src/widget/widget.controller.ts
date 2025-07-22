import {
  Body,
  Controller,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { WidgetService } from './widget.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('api/widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Post('booking')
  async createBooking(
    @Headers('X-Widget-API-Key') apiKey: string,
    @Body() dto: CreateBookingDto,
  ) {
    // validate key
    const VALID_API_KEY = process.env.WIDGET_API_KEY;
    if (!apiKey || apiKey !== VALID_API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return this.widgetService.createBooking(dto);
  }
}
