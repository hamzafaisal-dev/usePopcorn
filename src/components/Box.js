import "../index.css"
import { useState } from "react";

// passing elements as props
// function Box({ element }) {

//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen((open) => !open)}
//       >
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && element}
//     </div>
//   );
// }

// passing elements as children

export function Box({ children }) {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && (children)}
        </div>
    );
}