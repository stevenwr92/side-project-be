import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserResponse } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    return new UserResponse(user);
  }

  @Patch()
  editUser() {}
}
