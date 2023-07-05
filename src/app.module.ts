import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OutletModule } from './outlet/outlet.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    OutletModule,
    UserModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
