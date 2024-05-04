import { AbstractRepository } from "src/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Contact } from "./schema/contact.schema";

@Injectable()
export class ContactRepository extends AbstractRepository<Contact> {
    protected readonly logger = new Logger(ContactRepository.name);

    constructor(
        @InjectModel(Contact.name) ContactModel: Model<Contact>,
        @InjectConnection() connection: Connection
    ) {
        super(ContactModel, connection);
    }
}