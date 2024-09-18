import HttpStatus from 'http-status-codes';
import notesLabel from '../services/notes.service';
import { Request, Response, NextFunction } from 'express';
import RedisNote from '../utils/redis.util';

class NotesController {
  public NotesLabel = new notesLabel();
  public redis = new RedisNote();
  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesLabel.createNotes(req.body, res, next);

      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Notes created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      let data = await this.NotesLabel.getAllNotes();
      // data = await this.redis.getValue('notes');
      // if (data) {
      //   data = JSON.parse(data as any);
      //   console.log('Notes data retrive from cache');
      // }
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        record: data.length,
        data,
        message: 'All Notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  /////////////////////////

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesLabel.getNote(req.params._id);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'User fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */

  /**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public EditNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesLabel.EditNote(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public deleteNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.NotesLabel.deleteNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'Notes deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  public deleteAllNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.NotesLabel.deleteAllNote();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: ' deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  /////////////////////////
  // archiveNote
  public archiveNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesLabel.archiveNote(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data
      });
    } catch (error) {
      next(error);
    }
  };

  //////////////////////////////////
  // archiveNote
  public trashNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesLabel.trashNotes(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data
      });
    } catch (error) {
      next(error);
    }
  };
  //// reminder
  // public reminder = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<any> => {
  //   try {
  //     const data=await this.NotesLabel.reminder(req.params._id,res,next);
  //     res.status(HttpStatus.OK).json({
  //       code: HttpStatus.OK,
  //      message:"Reminder send to mail"
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default NotesController;
