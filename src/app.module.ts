import { Module } from '@nestjs/common';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CoffeesModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}
