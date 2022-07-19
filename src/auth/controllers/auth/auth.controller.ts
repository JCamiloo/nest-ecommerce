import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  login(@Req() request: Request) {
    return this.authService.generateJWT(request.user as User);
  }
}
