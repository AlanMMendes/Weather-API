// Here lies the logic of the controller
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getHello(): string {
    return 'Hello World!';
  }
}
