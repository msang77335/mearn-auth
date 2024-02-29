import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategies';
import { UserModule } from '../shared/user';
import { JWT_EXPIRESIN_ACCESS_TOKEN, JWT_SECRE_ACCESS_TOKEN } from 'src/config';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get(JWT_SECRE_ACCESS_TOKEN),
        signOptions: { expiresIn: config.get(JWT_EXPIRESIN_ACCESS_TOKEN) },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
