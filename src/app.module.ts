import { Module } from '@nestjs/common';
import { CoffeesModule } from './modules/coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
})
export class AppModule {}
