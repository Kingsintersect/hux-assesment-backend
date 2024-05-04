import { AbstractDocument } from "src/common";
import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User extends AbstractDocument {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);