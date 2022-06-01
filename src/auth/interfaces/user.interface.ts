import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly society: string;
  readonly password: string;
  readonly has_confirmed: string;
  readonly confirmed_at: Date;
}
