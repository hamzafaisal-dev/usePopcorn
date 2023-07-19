import { useEffect } from "react";

export function useKey(key, action) {
    useEffect(function () {

        function callBack(event) {
            if (event.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        }

        document.addEventListener('keydown', callBack);

        // clean-up func to remove event listener so that multiple listeners don't get created each time MovieDetails component is mounted
        return function () {
            document.removeEventListener('keydown', callBack);
        }

    }, [action, key]);
}