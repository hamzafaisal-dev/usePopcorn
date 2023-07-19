import "../index.css"
import { useState, useRef, useEffect } from "react";
import { useKey } from "../hooks/useKey";
import { Loader } from "./Loader";
import StarRating from "./StarRating";

const KEY = 'f73a5361';

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched }) {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);

    useEffect(function () {
        if (userRating) countRef.current = countRef.current + 1;
    }, [userRating]);

    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
            countRatingDecisions: countRef.current
        }

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    // effect to let user hit Esc key and close the current movie's details
    useKey('Escape', onCloseMovie);

    // effect to fetch movie details
    useEffect(function () {
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId])

    // effect to set page title to the name of selected movie
    useEffect(function () {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return function () {
            document.title = 'usePopcorn';
        }
    }, [title]);

    return (
        <div className="details">
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>🔙</button>
                        <div className="details-overview">
                            <image src={poster} alt={`Poster of ${movie} movie`} />
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>Genre: {genre}</p>
                            <p>{imdbRating} IMDb rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            <StarRating maxRating={10} size={24} />

                            <button className="btn-add" onClick={handleAdd}>Add to list</button>
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    );
}