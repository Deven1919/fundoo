import express, { IRouter } from 'express';
// import userController from '../controllers/user.controller';
// import authController from '../controllers/auth.controller';
import notesValidator from '../validators/notes.validator';
import notesController from '../controllers/notes.controller';
import userAuth from '../middlewares/auth.middleware';
import Cache from '../utils/redis.util';

class NotesRoutes {
  private router = express.Router();
  private NotesValidator = new notesValidator();
  private UserAuth = new userAuth();
  private Notes = new notesController();
  public cache = new Cache();

  constructor() {
    this.routes();
  }

  private routes = async () => {
    //route to get all users
    //  this.router.get('/getAllNotes',this.UserAuth.userAuth, this.Notes.getAllNotes);

    this.router.get(
      '/getAllNotes',
      this.cache.cacheMiddleware,
      this.Notes.getAllNotes
    );

    //route to create a new user

    this.router.post(
      '/createNotes',
      this.UserAuth.userAuth,
      this.Notes.createNote
    );

    // route to archive notes
    this.router.get('/archive/:id', this.Notes.archiveNote);
    // route to trash notes
    this.router.get('/trash/:id', this.Notes.trashNotes);

    //route to get a single note
    this.router.get('/getnote/:_id', this.Notes.getNote);

    // //route to update a single note
    this.router.patch('/editnote/:_id', this.Notes.EditNote);

    //route to delete a single note
    this.router.delete('/deletenote/:_id', this.Notes.deleteNote);

    //
  };

  public getNotes = (): IRouter => {
    return this.router;
  };
}

export default NotesRoutes;
