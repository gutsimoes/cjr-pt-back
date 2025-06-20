import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginValidationMiddleware } from './middleware/LoginValidationMiddleware';
@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})

export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}