import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JWT_EXPIRESIN_ACCESS_TOKEN } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_EXPIRESIN_ACCESS_TOKEN),
    });
  }

  async validate(payload: JwtPayload) {
    return { user: payload.sub, username: payload.username };
  }
}
