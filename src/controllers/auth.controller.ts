import HttpStatus from 'http-status-codes';
import userService from '../services/user.service'
import authService from '../services/auth.service'
import { Request, Response, NextFunction } from 'express';
import { string } from '@hapi/joi';


class AuthController {
    public UserService = new userService();
    public AuthService= new authService()
  
    /**
     * Controller to create new user
     * @param  {object} Request - request object
     * @param {object} Response - response object
     * @param {Function} NextFunction
     */
    public register = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.UserService.newUser(req.body);
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'User created successfully'
        });
      } catch (error) {
        next(error);
      }
    };
  
    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const data = await this.AuthService.login(req.body);
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            token:data.token,
            message: 'User logged in successfully'
          });

        } catch (error) {
          next(error);
        }
      };
    /////////////////////////
    public forgotpassword = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.AuthService.forgotpassword(req.body,req,next);
  
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: "Token send to email.",
    
        
        });

      } catch (error) {
        
        next(error)
      }
    };

public resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = await this.AuthService.resetPassword(req.params._id,req.body);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: "password reset done.",
      token:data.token

    
    });

  } catch (error) {
    
    next(error)
  }
};
   
  }
  
  export default AuthController;
  