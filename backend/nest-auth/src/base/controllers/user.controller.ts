import { Controller, UseGuards, Get, Query } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards';
import { GetUserReq, User, UserService } from 'src/shared/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public get(@Query() userReq: GetUserReq): Promise<User> {
    return this.userService.get(userReq.username);
  }
}
