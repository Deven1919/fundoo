import { Note } from '../interfaces/notes.interface';
import Notes from '../models/notes.model';
// import User from '../models/user.model'
import cron from 'node-cron';
import sendMail from '../utils/email.util';
import { NextFunction, Request, Response } from 'express';
import RedisNote from '../utils/redis.util';

class NotesLabel {
  //get all Notes of loggedIn user
  public util = new RedisNote();
  public getAllNotes = async (): Promise<Note[]> => {
    const notes = await Notes.find();
    await this.util.set(process.env.TOKEN, JSON.stringify(notes));

    return notes;
  };

  //create new note
  public createNotes = async (
    body: Note,
    res: Response,
    next: NextFunction
  ): Promise<Note> => {
    const { title, description, color, reminder } = body;

    if ([title, description].every((field) => field.trim() === '')) {
      return;
    }

    const newNote = await Notes.create(body);
    if (reminder) {
      const date = reminder.getDate();
      const month = reminder.getMonth();
      const message = `${description}`;

      cron.schedule(`0 0 ${date} ${month} *`, async function () {
        return await sendMail({
          email: res.locals.user.email,
          subject: `Reminder about : ${title}`,
          message
        }).then(() => {
          console.log('Reminder send to email.');
        });
      });
    }

    return newNote;
  };
  // get only one note
  public getNote = async (_id: string): Promise<Note[]> => {
    const notes = await Notes.find({ _id });

    return notes;
  };

  public EditNote = async (_id: string, body: Note): Promise<Note> => {
    const data = await Notes.findByIdAndUpdate(
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
  public deleteNote = async (_id: string): Promise<string> => {
    await Notes.findByIdAndDelete(_id);
    return '';
  };
  // delete all notes
  public deleteAllNote = async (): Promise<string> => {
    await Notes.deleteMany();
    return '';
  };

  // archive Note
  public archiveNote = async (_id: string): Promise<Note> => {
    const notes = await Notes.findById({ _id });
    notes.archive = true;
    notes.trash = false;
    return notes;
  };
  // trash note
  public trashNotes = async (_id: string): Promise<Note> => {
    const notes = await Notes.findById({ _id });
    notes.trash = true;
    notes.archive = false;
    return notes;
  };

  //   public reminder=async(_id:string,res:Response,next:NextFunction):Promise<any>=>{
  //   const note =await Notes.findById({_id}).select("+reminder")

  //   const date= note.reminder.getDate()
  //   const month= note.reminder.getMonth()
  //   console.log(date,month)
  //     const message = `Reminder is working.. `
  //  console.log(res.locals.user.email)

  //   return   cron.schedule('*/1 * * * *', await sendMail({
  //       email:res.locals.user.email,
  //       subject:"About reminder",
  //       message })
  //     );

  //   }
}

export default NotesLabel;
