import { UserRoles } from "../enums";

export declare interface UpdateUserRequest {
    fullname?: string;
    email?: string;
    phone_number?: string;
    password?: string;
    role?: UserRoles;
    is_verified?: boolean
    maqola?: string;
}