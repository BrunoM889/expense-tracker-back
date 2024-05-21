import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovementsModule } from './movements/movements.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, MovementsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
