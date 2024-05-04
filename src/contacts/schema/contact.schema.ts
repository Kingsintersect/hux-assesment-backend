import { AbstractDocument } from "src/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Contact extends AbstractDocument {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    phoneNumber: string;

}

export const ContactSchema = SchemaFactory.createForClass(Contact);