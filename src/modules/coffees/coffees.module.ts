import { Module } from '@nestjs/common';
import { CoffeeController } from './coffees.controller';
import { CoffeeService } from './coffees.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeesModule {}