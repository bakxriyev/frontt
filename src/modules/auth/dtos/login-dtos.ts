import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: "Foydalanuvchi email manzili",
        type: "string",
        required: true,
        example: "kamronbahriyev@gmail.com",
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Foydalanuvchi uchun kuchli parol",
        type: "string",
        required: true,
        example: "kamron123",
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}