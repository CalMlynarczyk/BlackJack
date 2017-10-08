import React from "react";
import ReactDOM from "react-dom";
import Card from "./card.jsx";

class Hand extends React.Component {
    render() {
        return (
            <ul className="hand">
                {this.props.hand.map(card =>
                    <Card card={card}></Card>
                )}
            </ul>
        );
    }
}

export default function renderHand(hand, elementId) {
    ReactDOM.render(
        <Hand hand={hand}></Hand>,
        document.getElementById(elementId)
    );
}
