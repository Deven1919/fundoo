import { Document } from 'mongoose';

export interface OTP extends Document {
  _id: string | number;
  passwordResetToken:string,
  generateToken?:()=>void
}

