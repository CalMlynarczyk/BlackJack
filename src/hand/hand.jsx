import "./hand.css";

import React from "react";
import { default as Card, mapCardToCode } from "./card.jsx";

export default class Hand extends React.Component {
    render() {
        return (
            <ul className="hand">
                {this.props.hand.map(card =>
                    <Card card={card} key={mapCardToCode(card)}></Card>
                )}
            </ul>
        );
    }
}
