import { Injectable } from '@nestjs/common';
import { User, CreatedUser } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { Res } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<CreatedUser> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUser(email: string): Promise<CreatedUser> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async register(user: User): Promise<Res> {
    const userExist = await this.getUser(user.email);

    if (!userExist) {
      const userCreated = await this.prisma.user.create({
        data: {
          ...user,
          balance: 0,
        },
      });

      return {
        ok: true,
        data: userCreated,
      };
    } else {
      return {
        ok: false,
        error: 'This email is already in use',
      };
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Res> {
    const user = await this.getUser(email);

    if (!user) {
      return {
        ok: false,
        error: 'User not found',
      };
    }


    if (user.password !== password) {
      return {
        ok: false,
        error: 'Wrong password',
      };
    } else {
      return {
        ok: true,
        data: user,
      };
    }
  }
}
