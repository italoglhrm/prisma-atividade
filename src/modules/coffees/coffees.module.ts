import { Module } from '@nestjs/common';
import { CoffeeController } from './coffees.controller';
import { CoffeeService } from './coffees.service';

@Module({
  imports: [],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeesModule {}
