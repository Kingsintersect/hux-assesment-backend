import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './schema/contact.schema';
import { ContactRepository } from './contacts.repository';
import { APP_FILTER } from '@nestjs/core';
import { DuplicateKeyFilter } from 'src/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }])
  ],
  controllers: [ContactsController],
  providers: [ContactsService, ContactRepository,
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyFilter,
    },
  ],
})
export class ContactsModule { }
