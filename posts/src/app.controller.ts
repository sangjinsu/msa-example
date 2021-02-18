import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDto } from './dto/CreatePostDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts')
  fetchPosts() {
    return this.appService.fetchPosts();
  }

  @Post('posts')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.appService.createPost(createPostDto);
  }

  @Post('events')
  sendEvent(@Body() event: { type: string; data: any }) {
    return this.appService.sendEvent(event);
  }
}
