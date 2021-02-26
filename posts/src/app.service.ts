import { HttpService, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CreatePostDto } from './dto/CreatePostDto';

export type Posts = {
  [k: string]: { id: string; title: string };
};

@Injectable()
export class AppService {
  private posts: Posts = {};
  constructor(private httpService: HttpService) {}

  fetchPosts = () => {
    return this.posts;
  };

  createPost = async (post: CreatePostDto) => {
    const id = randomBytes(4).toString('hex');
    const { title } = post;
    this.posts[id] = {
      id,
      title,
    };
    await this.httpService
      .post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: { id, title },
      })
      .toPromise();
    return this.posts[id];
  };

  sendEvent = (event) => {
    console.log('Received Event', event.type);
  };
}
