import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorName: String,
});

export const Book = model("Book", bookSchema);
