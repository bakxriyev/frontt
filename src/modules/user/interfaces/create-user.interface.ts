import { UserRoles } from "../enums";

export interface CreateUserRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    password: string;
    maqola?: string;
    role?: UserRoles;
}