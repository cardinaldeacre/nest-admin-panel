import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from './validation/validation.module';
import { LogMiddleware } from './log/log.middleware';
import { AuthMiddleware } from './auth/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role/role.guard';

@Module({
  imports: [
    UserModule,
    PrismaModule, 
    ValidationModule.forRoot(true)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.GET
    });
  }
}
