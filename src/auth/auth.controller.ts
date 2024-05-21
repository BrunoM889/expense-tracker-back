import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserById(id);
  }

  @Post('login')
  login(@Body() user: { email: string; password: string }) {
    return this.authService.login({
      email: user.email,
      password: user.password,
    });
  }

  @Post('register')
  register(@Body() user: User) {
    return this.authService.register({
      email: user.email,
      name: user.name,
      password: user.password,
    });
  }
}
