import { Document, Schema, Model, model } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxLength: 10
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  }
}, { timestamps: true });

const userModel: Model<IUser> = model("User", UserSchema);

export default userModel;