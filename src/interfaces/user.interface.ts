import { Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string | number;
  firstname: string;
  lastname: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  token?: string;
  isCorrectPassword?: (a: string, b: string) => string;
  createPasswordResetToken?: () => void;
  passwordResetToken?: String;
  passwordExpiresAt?: Date | number;
}
