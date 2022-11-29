import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";

import schema from "../schema/schema.js";

mongoose.connect("mongodb://localhost:3000/test", { useNewUrlParser: true });

const app = express();

app.use("/graphql", graphqlHTTP({}));

app.listen(4000, () => {
  console.log("listening for requests");
});
