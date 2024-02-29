import { Module } from '@nestjs/common';

import * as controllers from './controllers';
import { UserModule } from 'src/shared/user';

@Module({
  imports: [UserModule],
  controllers: Object.values(controllers),
})
export class BaseModule {}
