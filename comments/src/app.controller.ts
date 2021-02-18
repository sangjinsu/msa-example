import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCommentDto } from './dto/createCommentDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts/:id/comments')
  fetchComments(@Param('id') id: string) {
    return this.appService.fetchComments(id);
  }

  @Post('posts/:id/comments')
  createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.appService.createComment(id, createCommentDto);
  }

  @Post('events')
  sendEvent(@Body() event: { type: string; data: any }) {
    return this.appService.sendEvent(event);
  }
}
