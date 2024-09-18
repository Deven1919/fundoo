import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, 'firstName is required'],
      trim: true,
      maxLength: [40],
      minLength: 1
    },
    lastname: {
      type: String,
      required: [true, 'LastName is required'],
      trim: true,
      maxLength: [40],
      minLength: 1
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'pass is required'],
      minLenght: 5,
      select: false
    },
    confirm_password: {
      type: String,
      required: [true, 'password is required'],
      minLenght: 5,
      select: false,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'please enter the correct password.'
      }
    },
    passwordResetToken: String,
    passwordExpiresAt: Date
  },

  {
    timestamps: true
  }
);

// Hashing the password

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirm_password = undefined;
  next();
});
////////////////////////////////////////////

// Comparing password
userSchema.methods.isCorrectPassword = async function (
  user_password,
  password
) {
  return await bcrypt.compare(password, user_password);
};

// creating the token if user forgot the password so he can logged in if user exist
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default model<IUser>('User', userSchema);
