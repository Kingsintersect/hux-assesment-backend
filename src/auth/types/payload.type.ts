import { Types } from "mongoose";

export interface PayloadType {
    email: string;
    id: string;
    userRole?: string;
}