import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('events')
  fetchEvent(@Body() event: { type: string; data: any }) {
    return this.appService.fetchEvent(event);
  }
}
