import mongoose = require("mongoose");

export interface IDocument extends mongoose.Document {
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

}

export const DocumentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  body: { type: String, required: true },
  tags: { type: Array, required: false },
  updated: { type: Date, required: true },
  created: { type: Date, required: true },
  lastEditedBy: { type: String, required: true },
  markup: { type: String, required: true },
  noteHistory:  { type: String, required: false }
}); // { _id: false });

const Document = mongoose.model<IDocument>("Document", DocumentSchema);
export default Document;