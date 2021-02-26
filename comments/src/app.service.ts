import { HttpService, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CreateCommentDto } from './dto/createCommentDto';

export type Comment = {
  id: string;
  content: string;
  status: string;
};

export type CommentsByPostId = {
  [key: string]: Comment[];
};

@Injectable()
export class AppService {
  private commentsByPostId: CommentsByPostId = {};

  constructor(private httpService: HttpService) {}

  fetchComments(id: string) {
    return this.commentsByPostId[id] || [];
  }

  async createComment(id: string, createCommentDto: CreateCommentDto) {
    const commentId = randomBytes(4).toString('hex');
    const { content } = createCommentDto;
    const comments = this.commentsByPostId[id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    this.commentsByPostId[id] = comments;
    await this.httpService
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
          id: commentId,
          content,
          postId: id,
          status: 'pending',
        },
      })
      .toPromise();
    return comments;
  }

  sendEvent = (event: { type: string; data: any }) => {
    const { type, data } = event;
    console.log('Event Received:', type);
    if (type === 'CommentModerated') {
      const { postId, id, status, content } = data;
      const comments = this.commentsByPostId[postId];
      const comment = comments.find((comment) => comment.id === id);
      comment.status = status;
      this.httpService
        .post('http://evnet-bus-srv:4005/events', {
          type: 'CommentUpdated',
          data: {
            id,
            status,
            postId,
            content,
          },
        })
        .toPromise();
    }
  };
}
