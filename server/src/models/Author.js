import { Schema, model } from "mongoose";

// mongodb assigns a unique id to each collection, no need to add it
const authorSchema = new Schema({
  name: String,
  age: Number,
});

export const Author = model("Author", authorSchema);
