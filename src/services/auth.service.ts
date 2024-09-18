import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import jwt, { sign } from 'jsonwebtoken';
import sendMail from '../utils/email.util';
import { NextFunction, Request } from 'express';
import Otp from '../models/otp.model';
import { OTP } from '../interfaces/otp.interface';
import crypto from 'crypto';

const signIn = (id) => {
  return jwt.sign({ id }, process.env.KEY, { expiresIn: process.env.EXPIRES });
};

class AuthService {
  //create new user
  public newUser = async (body: IUser): Promise<IUser> => {
    const { firstname, lastname, confirm_password, password, email } = body;
    // Checking if all filed are present
    if (
      [firstname, lastname, confirm_password, password, email].some(
        (field) => field.trim() === ''
      )
    ) {
      throw new Error('All field are necessary..');
    }
    // If user already exist
    const existingUser = await User.findOne({
      $or: [{ firstname }, { email }]
    });
    if (existingUser) {
      throw new Error('User already exist');
    }

    const user = await User.create(body);
    user.password = undefined;
    user.confirm_password = undefined;
    return user;
  };
  /////////////////////////////////////////////////////////////////////////////////////
  public login = async (body: IUser): Promise<IUser> => {
    const { password, email } = body;
    // Checking if all filed are present
    if ([password, email].some((field) => field.trim() === '')) {
      throw new Error('All field are necessary..');
    }

    // checking in user exist in database
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.isCorrectPassword(user.password, password))) {
      throw new Error('Incorrect Email or Password');
    }

    let token = signIn(user._id);
    user.token = token;
    console.log(user);
    return user;
  };
  /////////////////////////////////////////////////////

  public forgotpassword = async (
    body: IUser,
    req: Request,
    next: NextFunction
  ): Promise<void> => {
    const { email } = body;

    // Check if user exist in Db
    let user = await User.findOne({ email });
    // If user not exist

    if (!user) {
      throw new Error('User belong to email not exist.');
    }
    const resetToken = user.createPasswordResetToken();

    user = await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}//:${req.get(
      'host'
    )}/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with new password and confirm password
   to : ${resetURL}.`;

    return await sendMail({
      email: user.email,
      subject: 'Your resetToken (valid for 10 min)',
      message
    }).catch(async (err) => {
      user.passwordResetToken = undefined;
      user.passwordExpiresAt = undefined;
      await user.save({ validateBeforeSave: false });
      next(err);
    });

    //  } catch (error) {
    //     user.passwordResetToken = undefined;
    //     user.passwordExpiresAt = undefined;
    //     await user.save({ validateBeforeSave: false });

    //  }
  };

  public resetPassword = async (
    resetToken: string,
    body: IUser
  ): Promise<IUser> => {
    const { password } = body;
    const hashToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    console.log(hashToken);

    const user = await User.findOne({
      passwordResetToken: hashToken,
      passwordExpiresAt: { $gt: Date.now() }
    }).select('+password');
    //  console.log(user)
    if (!user) {
      throw new Error('User not exist. please login again');
    }
    user.password = password;
    user.passwordExpiresAt = undefined;
    user.passwordResetToken = undefined;
    await user.save();
    let token = signIn(user._id);
    user.token = token;
    return user;
  };
}
export default AuthService;
