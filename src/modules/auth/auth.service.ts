import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto, RegisterDto } from './dtos';
import { AuthResponse } from './interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  private generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  private generateTokens(userId: number, email: string, role: string) {
    return {
      accessToken: this.jwtService.sign(
        { userId, email, role },
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '24h', secret: process.env.JWT_ACCESS_SECRET },
      ),
      refreshToken: this.jwtService.sign(
        { userId, email, role },
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d', secret: process.env.JWT_REFRESH_SECRET },
      ),
    };
  }

  async register(registerDto: RegisterDto, maqola: Express.Multer.File) {
    const { email, first_name, last_name, password, phone_number } = registerDto;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
        throw new HttpException("Email allaqachon ro'yxatdan o'tgan", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
        first_name,
        last_name,
        email,
  
        phone_number,
        password: hashedPassword,
        maqola: maqola ? maqola.filename : null,
    });

    return {
        message: 'Ro‘yxatdan o‘tish muvaffaqiyatli amalga oshirildi',
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: hashedPassword,
            maqola: user.maqola,
            phone_number:user.phone_number,
            role: user.role,
        },
    };
}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
        throw new HttpException("Email yoki parol noto'g'ri", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Hash bilan solishtirish
    if (!isPasswordValid) {
        throw new HttpException("Email yoki parol noto'g'ri", HttpStatus.UNAUTHORIZED);
    }

    const tokens = this.generateTokens(user.id, user.email, user.role);
    return {
        ...tokens,
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            maqola: user.maqola,
            phone_number: user.phone_number,
        },
        message: 'Muvaffaqiyatli login qilindi',
    };
}
}
