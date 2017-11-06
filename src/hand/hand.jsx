import "./hand.css";

import React from "react";
import { default as Card, mapCardToCode } from "./card.jsx";

const Hand = ({ hand }) => {
    return (
        <ul className="hand">
            {hand.map(card =>
                <Card card={card} key={mapCardToCode(card)} />
            )}
        </ul>
    );
};

export default Hand;
