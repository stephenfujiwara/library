import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/type-defs.js";
import { resolvers } from "./schema/resolvers.js";

import mongoose from "mongoose";

const MONGO =
  "mongodb+srv://stephenfujiwara:sharingan1@cluster0.64iq1dm.mongodb.net/?retryWrites=true&w=majority";

// typeDefs: define our Types, types of queries, types of data, etc.
// resolvers: define how we are going to resolve queries or mutations

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

mongoose
  .connect(MONGO, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connection successful");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`serving running at ${res.url}`);
  });
