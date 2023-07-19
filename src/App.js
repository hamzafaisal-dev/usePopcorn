import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { Logo } from "./components/Logo";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage"
import { NavBar } from "./components/Navbar"
import { Search } from "./components/Search";
import { NumResults } from "./components/NumResults";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import { MovieList } from "./components/MovieList";
import { MovieDetails } from "./components/MovieDetails";
import { WatchedSummary } from "./components/WatchedSummary";
import { WatchedMoviesList } from "./components/WatchedMoviesList";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // used pure (w/o any params) callback function that will get 'watched' array from localStorage and set it as the init state of watched variable
  // const [watched, setWatched] = useState(function () {
  //   let storedValue = localStorage.getItem('watched');
  //   storedValue = storedValue ? JSON.parse(storedValue) : [];
  //   return storedValue;
  // });

  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id); // if curr ID is the same as the one passed in then set to null else set to id (basically if we click on the movie, it will show details and if we click on same movie again, it will close details)
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {

    const alreadyAdded = watched.filter((addedMovie) => addedMovie.imdbID === movie.imdbID);

    if (alreadyAdded.length === 0) {
      setWatched(watched => [...watched, movie]);
    }
  }

  function handleDeletedWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>

        {/* passing components as props  */}
        {/* <Box element={<MovieList movies={movies} />} />

        <Box element={
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        }
        /> */}

        {/* passing components as children */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage error={error} />}
        </Box>

        <Box>
          {selectedId ?
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} /> :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeletedWatched} />
            </>
          }
        </Box>

      </Main>
    </>
  );
}
