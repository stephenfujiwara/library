import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import mongoose from "mongoose";
import { typeDefs } from "./schema/type-defs";
import { resolvers } from "./schema/resolvers";

mongoose.set("strictQuery", true);

const cors = Cors();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: true,
  playground: true,
});

const serverStart = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("mongodb connection successful"));
  await serverStart;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
