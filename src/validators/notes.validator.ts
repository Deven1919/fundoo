import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class NotesValidator {
  public newNote = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().alphanum(),
      description:Joi.string().alphanum(),
      color:Joi.string()
      
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

export default NotesValidator;
