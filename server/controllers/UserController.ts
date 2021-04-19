//https://github.com/microsoft/TypeScript-Node-Starter/tree/master/src

import { Request, Response, NextFunction } from "express";
import { User, UserDocument } from "../models/user";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import crypto from "crypto";
import { CallbackError, NativeError } from "mongoose";


export let signUp = (req: Request, res: Response, next: NextFunction) => {
    //User.register(new User({ username: req.body.username }),
    //  req.body.password, (err, user) => {
    //    if (err) {
    //      res.statusCode = 500;
    //      res.setHeader('Content-Type', 'application/json');
    //      res.json({
    //        err: err
    //      });
    //    } else {
    //      passport.authenticate('local')(req, res, () => {
    //        User.findOne( {username: req.body.username }, (err: any, user: any) => {
    //          res.statusCode = 200;
    //          res.setHeader('Content-Type', 'application/json');
    //          res.json({
    //            success: true,
    //            status: 'Registration Successful!',
    //          });
    //        });
    //      })
    //    }
    //  })
  const user = new User({
      //_id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  });

User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
      if (err) { res.send("error while find user"); }
      if (existingUser) {
         res.send("user already exist");
      } else{
          user.save((err) => {
          if (err) {res.send("error while save new user"); }
          req.logIn(user, (err) => {
              if (err) { res.send("error while login new user"); }
              res.send(user._id);
          });
      });
      }
      
  });
 }


 export let logIn = (req: Request, res: Response, next: NextFunction) => {
    //User.findOne({ username: req.body.username}, (err: any, user: any) => {
    //    res.statusCode = 200;
    //    res.setHeader('Content-Type', 'application/json');
    //    res.json({
    //      success: true,
    //      status: 'You are successfully logged in!'
    //    });
    //  })

      passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { 
          res.send("error");
         }
        if (!user) {
          res.send("incorrect user data");
        }else{
        req.logIn(user, (err) => {
          if (err) { res.send("incorrect user data"); }
          else{
          res.send(user._id);
          }
        });
      }
    })(req, res, next);
      
}

export let logOut = (req: Request, res: Response, next: NextFunction) => {
    //if (req.session) {
    //    req.logout();
    //    req.session.destroy((err) => {
    //      if (err) {
    //        console.log(err);
    //      } else {
    //        res.clearCookie('session-id');
    //        res.json({
    //          message: 'You are successfully logged out!'
    //        });
    //      }
    //    });
    //  } else {
    //    var err = new Error('You are not logged in!');
    //    res.status(403);
    //    next(err);
    //  }
    req.session.destroy(function(err){
      if(err){
         console.log(err);
      }else{
        req.logout();
      }
   });
   req.logout();
   res.send("success logout");
    //res.statusCode = 200;
    //        res.setHeader('Content-Type', 'application/json');
    //        res.json({
    //        success: true,
    //        status: 'You are successfully logged out!'
    //      });
}
