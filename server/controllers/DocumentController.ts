import { Request, Response } from "express";
import Document from "./../document";

export let allDocuments = (req: Request, res: Response) => {
    let documents = Document.find((err: any, documents: any) => {
        if (err) {
          res.send("Error!");
        } else {
          res.send(documents);
        }
      });
};

export let getDocument = (req: Request, res: Response) => {
    console.log(`test`);
    let document = Document.findById(req.params.id, (err: any, document: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(document);
        }
      });
};

export let deleteDocument = (req: Request, res: Response) => {
    let document = Document.findByIdAndDelete({ _id: req.params.id }, null, (err: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully Deleted Document");
        }
      });
};

export let updateDocument = (req: Request, res: Response) => {
    console.log(req.body);
    let document = Document.findByIdAndUpdate(
      req.params.id,
      req.body,
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
    var document = new Document(req.body);

    document.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(document);
      }
    });
};