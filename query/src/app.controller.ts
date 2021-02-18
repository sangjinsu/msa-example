import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts')
  fetchPosts() {
    return this.appService.fetchPosts();
  }

  @Post('events')
  sendEvent(@Body() event: { type: string; data: any }) {
    return this.appService.sendEvent(event);
  }
}
