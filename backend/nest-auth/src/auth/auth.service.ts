import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type {
  JwtPayload,
  JwtSign,
  Payload,
  RefreshJwtPayload,
} from './auth.interface';
import { UserService } from '../shared/user';
import {
  JWT_EXPIRESIN_REFRESH_TOKEN,
  JWT_SECRE_REFRESH_TOKEN,
} from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<Payload | null> {
    const user = await this.userService.get(username);

    if (user.password === password)
      return { userId: user.id, username: user.name, roles: user.roles };

    return null;
  }

  public jwtSign(data: Payload): JwtSign {
    console.log(this.configService.get(JWT_SECRE_REFRESH_TOKEN));
    const payload: JwtPayload = {
      sub: data.userId,
      username: data.username,
      roles: data.roles,
    };

    return {
      access_token: this.jwt.sign(payload),
      refresh_token: this.getRefreshToken({ username: payload.username }),
    };
  }

  public async refreshToken(payload: RefreshJwtPayload) {
    const user = await this.userService.get(payload.username);

    const jwtPayload: JwtPayload = {
      sub: user.id,
      username: user.name,
      roles: user.roles,
    };

    return {
      access_token: this.jwt.sign(jwtPayload),
    };
  }

  private getRefreshToken(payload: RefreshJwtPayload): string {
    return this.jwt.sign(payload, {
      secret: this.configService.get(JWT_SECRE_REFRESH_TOKEN),
      expiresIn: this.configService.get(JWT_EXPIRESIN_REFRESH_TOKEN),
    });
  }
}
