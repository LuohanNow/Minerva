import mongoose = require("mongoose");
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";

//import passportLocalMongoose = require('passport-local-mongoose');

export type UserDocument = mongoose.Document & {
    //_id: mongoose.Schema.Types.ObjectId,
    username: string;
    password: string;
    email: string;
    //documents: [{type:mongoose.Schema.Types.ObjectId, ref: 'Document'}]

    comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

export const UserSchema = new mongoose.Schema<UserDocument>({
  //_id: {type: mongoose.Schema.Types.ObjectId, unique: true, required: false},
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  //documents: [{type:mongoose.Schema.Types.ObjectId, ref: 'Document'}]
}); // { _id: false });

UserSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, null, (err: mongoose.Error, hash) => {
          if (err) { return next(err); }
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
      cb(err, isMatch);
  });
};

//UserSchema.methods.comparePassword = comparePassword;

//UserSchema.plugin(passportLocalMongoose);
export const User = mongoose.model<UserDocument>("User", UserSchema);