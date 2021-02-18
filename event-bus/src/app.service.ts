import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private events = [];
  constructor(private httpService: HttpService) {}
  fetchEvent = (event: { type: string; data: any }) => {
    // await this.httpService
    //   .post('http://localhost:4000/events', event)
    //   .toPromise();
    // await this.httpService
    //   .post('http://localhost:4001/events', event)
    //   .toPromise();
    // await this.httpService
    //   .post('http://localhost:4002/events', event)
    //   .toPromise();
    // await this.httpService
    //   .post('http://localhost:4003/events', event)
    //   .toPromise();
    this.events.push(event);
    this.httpService
      .post('http://localhost:4000/events', event)
      .toPromise()
      .catch((err) => console.log(err.message));
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
  };

  sendEvent = () => {
    return this.events;
  };
}
