import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from 'src/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
          MONGODB_URI: Joi.string().required(),
          JWT_SECRET: Joi.string().required(),
          JWT_EXPIRATION: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    JwtModule.registerAsync({
      useFactory: (configServices: ConfigService) => ({
          secret: configServices.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configServices.get('JWT_EXPIRATION')}s`,
          },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    PassportModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
