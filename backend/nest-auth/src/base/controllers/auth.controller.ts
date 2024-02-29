import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { AuthService, JwtSign } from '../../auth';
import { LocalAuthGuard, RefreshJwtAuthGuard } from 'src/auth/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public login(@Request() req): JwtSign {
    return this.authService.jwtSign(req.user);
  }

  @Get('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
