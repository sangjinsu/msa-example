import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('events')
  fetchEvent(@Body() event: { type: string; data: any }) {
    return this.appService.fetchEvent(event);
  }

  @Get('events')
  sendEvent() {
    return this.appService.sendEvent();
  }
}
