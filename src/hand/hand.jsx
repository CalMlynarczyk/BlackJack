import React from "react";
import Card from "./card.jsx";

export default class Hand extends React.Component {
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
