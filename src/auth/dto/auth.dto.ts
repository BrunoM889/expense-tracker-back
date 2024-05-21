import { IsEmail, IsString, MaxLength } from 'class-validator';

export class User {
  @IsEmail()
  email: string;
  @IsString()
  @MaxLength(20)
  name: string;
  @IsString()
  @MaxLength(20)
  password: string;
}

export class CreatedUser extends User {
  id: number;
  balance: number;
}

export class Res {
  ok: boolean;
  data?: CreatedUser;
  error?: string;
}
