import { Schema, model} from 'mongoose';
import { Note } from '../interfaces/notes.interface';
import { boolean, required } from '@hapi/joi';

const NotesSchema = new Schema<Note>(
  {
    title: {
      type:String

},
    description:{
      type:String,
    },
    color:{
      type:String,
    
    },
    archive:{
      type:Boolean,
      default:false
    },
    trash:{
      type:Boolean,
      default:false
    },
    reminder:{
      type:Date,
      
    }
  },
  {
    timestamps: true
  }
);






export default model<Note>('Notes', NotesSchema);
