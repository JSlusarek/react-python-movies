import './App.css';
import {useState, useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/movies")
            .then(response => response.json())
            .then(data => {
                console.log("📥 Odebrane filmy z API:", data);
                setMovies(data);
            })
            .catch(error => console.error("❌ Błąd pobierania filmów:", error));
    }, []);

    function handleAddMovie(movie) {
        console.log("📤 Wysyłanie filmu:", movie);

        fetch("http://127.0.0.1:8000/movies", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(movie)
        })
            .then(response => response.json())
            .then(newMovie => {
                console.log("✅ Film zapisany w API:", newMovie);
                setMovies([...movies, newMovie]);
                setAddingMovie(false);
            })
            .catch(error => console.error("❌ Błąd dodawania filmu:", error));
    }

    function handleDeleteMovie(movie) {
        console.log("🗑 Usuwanie filmu:", movie);

        fetch(`http://127.0.0.1:8000/movies/${movie.id}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("❌ Nie udało się usunąć filmu");
                }
                setMovies(movies.filter(m => m.id !== movie.id));
            })
            .catch(error => console.error("❌ Błąd usuwania filmu:", error));
    }

    return <div className="container">
        <h1>My favourite movies to watch</h1>
        {movies.length === 0
            ? <p>No movies yet. Maybe add something?</p>
            : <MoviesList movies={movies}
                          onDeleteMovie={handleDeleteMovie}
            />}
        {addingMovie
            ? <MovieForm onMovieSubmit={handleAddMovie}
                         buttonLabel="Add a movie"
            />
            : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
    </div>;
}

export default App;
