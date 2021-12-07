import mongoose, {Schema, PassportLocalModel, PassportLocalDocument} from 'mongoose';

import passportLocalMongoose from 'passport-local-mongoose';

const emailRegEx =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';

const userSchema = new Schema({
    email: {
        type: String,
        regex: emailRegEx
    }, 
    username: {
        type: String
    } ,
      __v: { type: Number, select: false },
});

export const MIN_LENGTH = 6;
export const PASSWORD_LENGTH_ERROR = 'PasswordLengthError';

const passwordValidator = (password: string, cb: any) => { 
    if(password.trim().length < MIN_LENGTH) {
        return cb({
            name: PASSWORD_LENGTH_ERROR,
            password: "Please password should have at least 6 characters",
        }) ;
    }
    return cb();
}


userSchema.plugin(passportLocalMongoose, {
    passwordValidator,
    usernameField: 'email',
});

export type User = {
    email: string,
    resetToken: string,
};

export interface UserDocument extends User, PassportLocalDocument { 
    email: string,
    resetToken: string,
};

export interface UserModel extends PassportLocalModel<UserDocument> {};

export default mongoose.model<UserDocument, UserModel>('User', userSchema);


