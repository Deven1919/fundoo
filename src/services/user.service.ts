import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import RedisNote from '../utils/redis.util';
// import UserRoutes from '../routes/user.route';

class UserService {
  public rediscache = new RedisNote();
  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    await this.rediscache.set('user', JSON.stringify(data));
    return data;
  };

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
    let token = jwt.sign({ _id: user._id }, process.env.KEY, {
      expiresIn: process.env.EXPIRES
    });

    user.token = token;
    user.password = undefined;
    return user;
  };

  //update a user
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };

  //get a single user
  public getUser = async (id: string): Promise<IUser> => {
    const data = await User.findById(id);
    console.log(data);

    return data;
  };
}

export default UserService;
