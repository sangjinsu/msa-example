import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  fetchEvent(event: {
    type: string;
    data: {
      id: string;
      status: string;
      postId: string;
      content: string;
    };
  }) {
    const { type, data } = event;
    if (type === 'CommentCreated') {
      const status = data.content.includes('orange') ? 'rejected' : 'approved';
      this.httpService
        .post('http://event-bus-srv:4005/events', {
          type: 'CommentModerated',
          data: {
            id: data.id,
            postId: data.postId,
            status,
            content: data.content,
          },
        })
        .toPromise();
    }
  }
}
