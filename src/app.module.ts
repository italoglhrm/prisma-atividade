import { Module } from '@nestjs/common';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CoffeesModule, PrismaModule],
  controllers: [], 
  providers: [],   
})
export class AppModule {}