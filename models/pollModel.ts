import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 30
  },
  desc: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 60
  },
  closed: {
    type: Boolean,
    required: true,
    default: false
  },
  choices: [
    {
      desc: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 30
      },
      count: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
      }
    }
  ]
}, { timestamps: true });

const pollModel = mongoose.model("Poll", PollSchema);

export default pollModel;