import { NextFunction } from 'express';
import { Document } from 'mongoose';

export interface Note extends Document {
  _id: string | number;
  title?: string;
  description?: string;
  color?: string;
  trash: Boolean;
  archive: Boolean;
  reminder: Date;
  status: any;
}
