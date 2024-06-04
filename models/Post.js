import mongoose from "mongoose";

import { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String, 
      required: true,
    },
    categories: {
      type: Array, // we gona push all categories into his array
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
