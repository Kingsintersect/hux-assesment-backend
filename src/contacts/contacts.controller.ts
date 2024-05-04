import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Get('search')
  search(@Query() queryParams: any) {
    return this.contactsService.search(queryParams);
  }

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(userId, createContactDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string,) {
    return this.contactsService.findAllPersonalContacts(userId);
  }



  @Patch(':userId')
  update(@Param('userId') userId: string, @Query() queryParams: any, @Body() updateContactDto: UpdateContactDto) {
    const contactId = queryParams.contactId;
    return this.contactsService.update(userId, contactId, updateContactDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string, @Query() queryParams: any) {
    const contactId = queryParams.contactId;
    return this.contactsService.remove(userId, contactId);
  }
}
