import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RouteAuthGuard extends AuthGuard('route') { }
