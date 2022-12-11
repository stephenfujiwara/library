import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import Title from "./components/Title";

function App() {
  // create instance of Apollo Client to make GraphQL queries
  const client = new ApolloClient({
    // cache to reduce unecessary re-queries
    cache: new InMemoryCache(),
    uri: "http://localhost:5000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
