import "./App.css";
import TMDB_API from "./components/TMDB_API";

function App() {
  return (
    <div className="App">
      <header> Movie Rater</header>
      <div>
        <TMDB_API />
      </div>
      <footer>This site uses TMDB (themoviedb) API</footer>
    </div>
  );
}

export default App;
