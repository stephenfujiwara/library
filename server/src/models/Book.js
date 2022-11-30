import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

export const Book = model("Book", bookSchema);
