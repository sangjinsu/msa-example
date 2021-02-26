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

    /**
    this.httpService
      .post('http://localhost:4001/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
    this.httpService
      .post('http://localhost:4002/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
    this.httpService
      .post('http://localhost:4003/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
     */
  }
}
