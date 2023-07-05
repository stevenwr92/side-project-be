import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.AuthService.signup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.AuthService.login(dto);
  }
}
