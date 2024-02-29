import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshJwtPayload } from '../auth.interface';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRE_REFRESH_TOKEN } from 'src/config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRE_REFRESH_TOKEN),
    });
  }

  async validate(payload: RefreshJwtPayload) {
    return payload;
  }
}
