import mongoose = require("mongoose");

export interface IDocument extends mongoose.Document {
    //_id: mongoose.Schema.Types.ObjectId,
    url: string;
    title: string;
    subtitle: string;
    body: string;
    tags: string[];
    updated: Date;
    created: Date;
    lastEditedBy: string; //User class?
    markup: string; //Markup class?
    docHistory: string;
    author: mongoose.Types.ObjectId;
}

export const DocumentSchema = new mongoose.Schema({
  //_id: {type: mongoose.Schema.Types.ObjectId, unique: true, required: false},
  url: { type: String, required: true },
  title: { type: String, required: true, text: true },
  subtitle: { type: String, required: false, text: true },
  body: { type: String, required: true, text: true },
  tags: { type: Array, required: false },
  updated: { type: Date, required: true, default: Date.now },
  created: { type: Date, required: true, default: Date.now },
  lastEditedBy: { type: String, required: true },
  markup: { type: String, required: true },
  noteHistory:  { type: String, required: false },
  author: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Author',
    required: false,
  },
}); // { _id: false });

//DocumentSchema.index({title: 'text', subtitle: 'text', body: 'text'});

const Document = mongoose.model<IDocument>("Document", DocumentSchema);
export default Document;