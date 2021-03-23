import mongoose = require("mongoose");
process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
const config = require('config');

const uri: string =  config.get('database.uri');

mongoose.connect(uri,  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


export interface IDocument extends mongoose.Document {
    url: string;
    title: string;
    subtitle: string;
    body: string;
    tags: string[];
    updated: Date;
    created: Date;
    last_edited_by: string; //User class?
    markup: string; //Markup class?
    doc_history: string;

}

export const DocumentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  body: { type: String, required: true },
  tags: { type: Array, required: false },
  updated: { type: Date, required: true },
  created: { type: Date, required: true },
  last_edited_by: { type: String, required: true },
  markup: { type: String, required: true },
  note_history:  { type: String, required: false }
}); // { _id: false });

const Document = mongoose.model<IDocument>("Document", DocumentSchema);
export default Document;