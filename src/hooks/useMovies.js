import { useState, useEffect } from "react";

const KEY = 'f73a5361';

export function useMovies(query, callBack) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState('');

    useEffect(function () {

        callBack?.();

        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

                if (!res.ok) throw new Error("Something went wrong!");

                const data = await res.json();

                if (data.Response === 'False') throw new Error('Movie not found');

                setMovies(data.Search);
                setError("");

            } catch (error) {
                console.error(error.message);

                if (error.name !== "AbortError") {
                    setError(error.message);
                }

            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError('');
            setIsLoading(false);
            return;
        }

        //handleCloseMovie();
        fetchMovies();

        // clean up function to make sure only the last keystroke is the one searched and not make fetch requests for every keypress
        return function () {
            controller.abort();
        }

    }, [query]);

    return { movies, isLoading, error };
}