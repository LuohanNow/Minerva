import { Request, Response } from "express";
import Document from "../models/document";
import mongoose = require("mongoose");

export let allDocuments = (req: Request, res: Response) => {
  var user_id: string = req.query.userid as string;
    let documents = Document.find({ author: mongoose.Types.ObjectId(user_id)},(err: any, documents: any) => {
        if (err) {
          res.send("Error!");
        } else {
          res.send(documents);
        }
      });
};

export let allDocumentsByTag = (req: Request, res: Response) => {
  var user_id: string = req.query.userid as string;
  var tag: string = req.query.tag as string;
    let documents = Document.find({ author: mongoose.Types.ObjectId(user_id), tags: tag } ,(err: any, documents: any) => {
        if (err) {
          res.send("Error!");
        } else {
          res.send(documents);
        }
      });
};


export let allTags = (req: Request, res: Response) => {
  var tags: string[] = []; 
  var user_id: string = req.query.userid as string;
    let documents = Document.find({ author: mongoose.Types.ObjectId(user_id)}, 'tags', null, (err: any, docs) => {
        if (err) {
          res.send("Error!");
        } else {
          for (let doc of docs){
            var test = doc.tags
            tags = tags.concat(doc.tags)
          }
          tags = tags.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
          })
          res.setHeader('Content-Type', 'application/json');
          res.json({
            tags: tags    
          }); 
        }
      });
};

export let searchText = (req: Request, res: Response) => {
  var user_id: string = req.query.userid as string;
    let documents = Document.find({ author: mongoose.Types.ObjectId(user_id),
       //title: { "$regex": req.body.info, "$options": "i" },
       //subtitle: { "$regex": req.body.info, "$options": "i" },
       body: { "$regex": req.body.info, "$options": "i" }
       }, (err: any, documents: any) => {
      if (err) {
        res.send("Error!");
      } else {
        res.send(documents);
      }
    });
};


export let getDocument = (req: Request, res: Response) => {
    let document = Document.findById(req.params.id, (err: any, document: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(document);
        }
      });
};

export let deleteDocument = (req: Request, res: Response) => {
    let document = Document.deleteOne({ _id: req.params.id }, undefined, (err: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully Deleted Document");
        }
      });
};

export let updateDocument = (req: Request, res: Response) => {    
    let document = Document.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      null,
      (err: any, document: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated document!");
        }
      }
    );
};

export let addDocument = (req: Request, res: Response) => {
  var user_id: string = req.query.userid as string;
    var document = new Document({
      url: req.body.url,
      title: req.body.title,
      subtitle: req.body.subtitle,
      body: req.body.body,
      tags: req.body.tags,
      updated: req.body.updated,
      created: req.body.created,
      lastEditedBy: req.body.lastEditedBy,
      markup: req.body.markup, 
      docHistory: req.body.docHistory,
      author: mongoose.Types.ObjectId(user_id)
    });

    document.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(document);
      }
    });
};