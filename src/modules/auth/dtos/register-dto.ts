import { IsString, IsEmail, IsNotEmpty, IsStrongPassword, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto  {
    @ApiProperty({
        description: "Foydalanuvchi ismi",
        type: "string",
        required: true,
        example: "Kamron",
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        description: "Foydalanuvchi familiyasi",
        type: "string",
        required: true,
        example: "Bahriyev",
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

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
        required: false,
        example: "kamron123",
    })
    @IsString()
    password?: string;

    @ApiPropertyOptional({
        description: "Foydalanuvchi telefon raqami",
        type: "string",
        required: false,
        example: "+998911234567",
    })
    @IsOptional()
    @IsString()
    phone_number?: string;

    @ApiPropertyOptional({
        description: "Foydalanuvchi roli",
        type: "string",
        required: false,
        example: "USER",
    })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiPropertyOptional({
        description: "Foydalanuvchi maqola fayli",
        type: "string",
        format: "binary",
        required: false
    })
    @IsOptional()
    maqola?: Express.Multer.File;
}