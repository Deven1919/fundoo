import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import authController from '../controllers/auth.controller';
import userValidator from '../validators/user.validator';
import userAuth from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private AuthController = new authController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private UserAuth = new userAuth();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all users
    this.router.get('/getAllUser', this.UserController.getAllUsers);
    this.router.get('/getuser/:id', this.UserController.getUser);
    //route to create a new user
    this.router.post('/register', this.AuthController.register);
    // this.router.post(
    //   '/register',
    //   this.UserValidator.newUser,
    //   this.AuthController.register
    // );
    this.router.get('/forgotpassword', this.AuthController.forgotpassword);
    this.router.get('/resetpassword/:_id', this.AuthController.resetPassword);
    this.router.post('/login', this.AuthController.login);
    // this.router.post('/protect',this.UserAuth.userAuth)

    //route to get a single user

    //route to update a single user
    this.router.patch('/edituser/:_id', this.UserController.updateUser);

    //route to delete a single user
    this.router.delete('/deleteuser/:_id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
