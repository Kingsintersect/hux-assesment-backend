import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from './contacts.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './schema/contact.schema';

@Injectable()
export class ContactsService {
  constructor(private readonly contactRepository: ContactRepository) { }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const newcontact = {
        ...createContactDto,
        username: createContactDto.firstName + createContactDto.lastName
      }
      const savedContact = await this.contactRepository.create(newcontact);
      return savedContact;
    } catch (error) {
      const { keyValue, errorResponse: { errmsg, code } } = error;
      if (code == "11000")
        throw new BadRequestException("Name already existed");
    }
  }

  async findAll(): Promise<Contact[]> {
    try {
      const allcontacts = await this.contactRepository.find({});
      if (allcontacts.length < 1) throw new NotFoundException("Contact list is empty");
      return allcontacts;
    } catch (error) {
      throw error
    }
  }

  async findContactsByPhoneNumber(phoneNumber: string): Promise<Contact> {
    try {
      const contacts = await this.contactRepository.findOne({ phoneNumber });
      if (!contacts) throw new NotFoundException("Contact list is empty");
      return contacts;
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    const updatecontact = {
      ...updateContactDto,
      username: updateContactDto.firstName + updateContactDto.lastName
    }
    try {
      const updatedContact = await this.contactRepository.findOneAndUpdate({ _id: id }, { ...updatecontact });
      if (updatedContact! instanceof Contact) throw new ForbiddenException("Problem updating contact");

      return updatedContact;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.contactRepository.findOneAndDelete({ _id: id })
    } catch (error) {
      throw new NotFoundException("Contact id could not be deleted", error);
    }
  }
}
