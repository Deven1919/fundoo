import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public newUser = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      name: Joi.string().min(1).max(15).required().alphanum(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
      
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

export default UserValidator;
