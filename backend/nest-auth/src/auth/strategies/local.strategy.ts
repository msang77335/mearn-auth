import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { Payload } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Payload> {
    const user = await this.auth.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('NotFoundUser');
    }

    return { userId: user.userId, username: user.username, roles: user.roles };
  }
}
