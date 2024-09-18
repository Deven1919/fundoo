/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model'

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */


class UserAuth{
  public userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      bearerToken = bearerToken.split(' ')[1];
     

      let  user : any = await jwt.verify(bearerToken,process.env.KEY);
   
     user = await User.findById(user.id);
     if(!user){
      throw new Error("User belongs to this token not exist")
     }
  
      res.locals.user = user;
    //  console.log(res.locals)
      res.locals.token = bearerToken;
      
     next();
    } catch (error) {
      next(error);
    }
  };
  
}

export default UserAuth