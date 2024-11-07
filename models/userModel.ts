import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    minlength: 1,
    maxLength: 10
  }
}, { timestamps: true });

const userModel = mongoose.model("User", UserSchema);

export default userModel;