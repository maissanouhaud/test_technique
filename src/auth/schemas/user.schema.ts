import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  society: String,
  password: String,
  has_confirmed: Boolean,
  confirmed_at: Date,
});
