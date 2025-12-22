import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
      minlength: 5,
    },
    password: {
      type: String,
      maxlength: 100,
      minlength: 6,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
