import "../index.css"
import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export function Search({ query, setQuery }) {

    const inputEl = useRef(null);

    useKey('Enter', function () {
        // if we write smth and hit enter then it gets erased instead of searching. this checks if currently active element is the search element; if yes then it does not erase shit. basically does nothing
        if (document.activeElement === inputEl.current) return;

        inputEl.current.focus();
        setQuery("");

    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
}