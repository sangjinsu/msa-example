import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private posts: {
    [key: string]: {
      id: string;
      title: string;
      comments: Array<{ id: string; content: string; status: string }>;
    };
  } = {};

  constructor(private httpService: HttpService) {
    this.fetchEvents();
  }

  fetchPosts = () => {
    return this.posts;
  };

  sendEvent = (event: { type: string; data: any }) => {
    const { type, data } = event;
    this.handleEvent(type, data);
  };

  private handleEvent = (type: string, data: any) => {
    console.log('Event Received', type);
    if (type === 'PostCreated') {
      const { id, title } = data;
      this.posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
      const {
        id,
        content,
        postId,
        status,
      }: { id: string; content: string; postId: string; status: string } = data;
      const post = this.posts[postId];
      post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
      const {
        id,
        content,
        postId,
        status,
      }: { id: string; content: string; postId: string; status: string } = data;
      const post = this.posts[postId];
      const comment = post.comments.find((comment) => comment.id === id);
      comment.status = status;
      comment.content = content;
    }
  };

  fetchEvents = async () => {
    const res = await this.httpService
      .get('http://event-bus-srv:4005/events')
      .toPromise();
    for (const event of res.data) {
      console.log('Processing event: ', event.type);
      this.handleEvent(event.type, event.data);
    }
  };
}
