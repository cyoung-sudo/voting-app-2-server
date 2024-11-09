import { Document, Schema, Model, model } from "mongoose";

interface IPoll extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  desc: string;
  closed: boolean;
  choices: [{desc: string, count: number}];
  voted: [Schema.Types.ObjectId];
}

const PollSchema = new Schema<IPoll>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
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
  ],
  voted: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

const pollModel: Model<IPoll> = model("Poll", PollSchema);

export default pollModel;