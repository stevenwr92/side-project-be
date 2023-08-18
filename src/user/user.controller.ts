import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateUser, EditUser, UserResponse } from './dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    return new UserResponse(user);
  }

  @Get()
  getAllUser(): Promise<UserResponse[]> {
    return this.UserService.getAllUser();
  }

  @Post()
  createUser(@Body() dto: CreateUser) {
    return this.UserService.createUser(dto);
  }

  @Patch(':id')
  editUser(
    @Param('id', ParseIntPipe)
    userId: number,
    @Body()
    dto: EditUser,
  ) {
    return this.UserService.editUserById(dto, userId);
  }

  @Delete(':id')
  deleteUserById(
    @Param('id', ParseIntPipe)
    userId: number,
  ) {
    return this.UserService.deleteUserByid(userId);
  }
}
