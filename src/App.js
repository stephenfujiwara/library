import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <Title />
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
