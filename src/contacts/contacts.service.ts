import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from './contacts.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './schema/contact.schema';

@Injectable()
export class ContactsService {
  constructor(private readonly contactRepository: ContactRepository) { }

  async create(id: string, createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const { firstName, lastName, phoneNumber } = createContactDto;
      const newcontact = {
        ...createContactDto,
        userId: id,
        username: firstName + lastName
      }

      const isExisted = await this.contactRepository.checkExistence({ username: firstName + lastName, userId: id })
      if (isExisted) throw new BadRequestException("Name already existed");

      const savedContact = await this.contactRepository.create(newcontact);
      return savedContact;
    } catch (error) {
      throw new BadRequestException("Name already existed");
    }
  }

  async findAllPersonalContacts(userId: string): Promise<Contact[]> {
    try {
      const allcontacts = await this.contactRepository.find({ userId });

      if (allcontacts.length < 1) throw new NotFoundException("Contact list is empty");
      return allcontacts;
    } catch (error) {
      throw error
    }
  }

  async search(queryParams: { firstname: string; lastname: string; phonenumber: string }) {
    const { firstname, lastname, phonenumber } = queryParams;

    switch (true) {
      case !!firstname:
        return this.findSingleContact({ firstName: firstname })
        break;
      case !!lastname:
        return this.findSingleContact({ lastName: lastname })
        break;
      case !!phonenumber:
        return this.findSingleContact({ phoneNumber: phonenumber })
        break;
      default:
        // Handle the case where no valid search parameters are provided
        break;
    }
  }

  async findSingleContact(param: any): Promise<Contact> {
    console.log(param, "param")
    try {
      const contacts = await this.contactRepository.findOne(param);
      if (!contacts) throw new NotFoundException("Cant't find contact on the list");
      return contacts;
    } catch (error) {
      throw error
    }
  }

  async update(userId: string, contactId: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    const updatecontact = {
      ...updateContactDto,
      username: updateContactDto.firstName + updateContactDto.lastName
    }
    try {
      const updatedContact = await this.contactRepository.findOneAndUpdate({ _id: contactId, userId }, { ...updatecontact });
      if (updatedContact! instanceof Contact) throw new ForbiddenException("Problem updating contact");

      return updatedContact;
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: string, contactId: string) {
    try {
      return await this.contactRepository.findOneAndDelete({ _id: contactId, userId })
    } catch (error) {
      throw new NotFoundException("Contact id could not be deleted", { ...error });
    }
  }
}
