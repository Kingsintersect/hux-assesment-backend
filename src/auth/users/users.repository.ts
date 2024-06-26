import { AbstractRepository } from "src/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { User } from "./schema/user.schema";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectModel(User.name) UserModel: Model<User>,
        @InjectConnection() connection: Connection
    ) {
        super(UserModel, connection);
    }
}