import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { ContactsService } from 'src/contacts/contacts.service';
import { PayloadType } from '../types/payload.type';

@Injectable()
export class RouteStrategy extends PassportStrategy(Strategy) {
  // constructor(private contactService: ContactsService) {
  //   super({ usernameField: 'email' });
  // }
  constructor(private configService: ConfigService, private contactService: ContactsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadType): Promise<any> {
    try {
      const user = await this.contactService.validateUser(payload.id);
      if (!user) throw new UnauthorizedException("You are not logged in!");
      return user;
    } catch (error) {
      throw new UnauthorizedException("You are not logged in!");
    }
  }
}
