import { IsEmpty, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Length(11)
    // @IsPhoneNumber('any', { message: 'Phone number must be valid' })
    phoneNumber: string;

    @IsEmpty()
    userId: string | null;
}