import "./hand.css";

import React from "react";
import { default as Card, mapCardToCode } from "./card.jsx";

// Keep the game board a consistent height using a
// hidden placeholder card element.
const placeholderCard = {
    suit: 0,
    value: { key: "two", val: 2 },
};

const Hand = ({ hand }) => {
    return (
        <ul className="hand">
            <Card card={placeholderCard} isHidden={true} />

            {hand.map(card =>
                <Card card={card} key={mapCardToCode(card)} />
            )}
        </ul>
    );
};

export default Hand;
