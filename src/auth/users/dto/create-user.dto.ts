import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Contact } from "src/contacts/schema/contact.schema";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}