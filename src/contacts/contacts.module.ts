import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './schema/contact.schema';
import { ContactRepository } from './contacts.repository';
import { APP_FILTER } from '@nestjs/core';
import { DuplicateKeyFilter } from 'src/common';
import { PassportModule } from '@nestjs/passport';
import { RouteStrategy } from 'src/auth/strategy/route.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/auth/users/users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
    PassportModule, AuthModule
  ],
  controllers: [ContactsController],
  providers: [ContactsService, ContactRepository, LocalStrategy, JwtStrategy, RouteStrategy,
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyFilter,
    },
  ],
})
export class ContactsModule { }
