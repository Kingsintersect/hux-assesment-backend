import { Controller, Get, Request, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RouteAuthGuard } from 'src/auth/guards/route-auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(req.user.userId, createContactDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    return this.contactsService.findAllPersonalContacts(req.user.userId);
  }

  @Get(':contactId')
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: any, @Param('contactId') contactId: string) {
    return this.contactsService.findSingleContact(req.user.userId, contactId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Request() req: any, @Query() queryParams: any, @Body() updateContactDto: UpdateContactDto) {
    const contactId = queryParams.contactId;
    return this.contactsService.update(req.user.userId, contactId, updateContactDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: any, @Query() queryParams: any) {
    const contactId = queryParams.contactId;
    return this.contactsService.remove(req.user.userId, contactId);
  }
}
