import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private static events = [];
  constructor(private httpService: HttpService) {}
  fetchEvent = (event: { type: string; data: any }) => {
    AppService.events.push(event);
    this.sendEvents(event);
  };

  sendEvent = () => {
    return AppService.events;
  };

  private sendEvents(event: { type: string; data: any }) {
    this.httpService
      .post('http://posts-clusterip-srv:4000/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
    this.httpService
      .post('http://comments-srv:4001/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
    this.httpService
      .post('http://query-srv:4002/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
    this.httpService
      .post('http://moderation-srv:4003/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
  }
}
