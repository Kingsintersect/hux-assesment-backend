import { AbstractDocument } from "src/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";

@Schema({ timestamps: true })
export class Contact extends AbstractDocument {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: string;

}

export const ContactSchema = SchemaFactory.createForClass(Contact);