// Here lies the logic of the controller
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findLocation(lat?: string, lon?: string, key?: string) {
    console.log(lat, lon, key);
    const data = this.httpService
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
      )
      .pipe(
        catchError((error: AxiosError) => {
          console.error(error);
          throw error.message;
        }),
      );

    return data;
  }
}
