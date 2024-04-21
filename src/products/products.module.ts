import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService], // tudo que vai usar tudo dentro do controller
  exports: [],
})
export class ProductsModule {}
