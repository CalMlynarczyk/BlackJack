import React from "react";
import { CARD_SUITS, CARD_VALUES } from "./cards";

export default class Card extends React.Component {
    render() {
        return (
            <li><img src={mapCardToSVG(this.props.card)} /></li>
        );
    }
}

const SVG_CARD_DIR = "Vector-Playing-Cards/cards-svg/";

function mapCardToSVG(card) {
    const suitCode = mapSuitToCode(card.suit);
    const valueCode = mapValueToCode(card.value);

    return `${SVG_CARD_DIR}${valueCode}${suitCode}.svg`;
}

function mapSuitToCode(suit) {
    switch (suit) {
        case CARD_SUITS.club:
            return "C";
        case CARD_SUITS.diamond:
            return "D";
        case CARD_SUITS.heart:
            return "H";
        case CARD_SUITS.spade:
            return "S";
        default:
            throw "Invalid card suit";
    }
}

function mapValueToCode(value) {
    switch (value) {
        case CARD_VALUES.two:
        case CARD_VALUES.three:
        case CARD_VALUES.four:
        case CARD_VALUES.five:
        case CARD_VALUES.six:
        case CARD_VALUES.seven:
        case CARD_VALUES.eight:
        case CARD_VALUES.nine:
        case CARD_VALUES.ten:
            return value.val;
        case CARD_VALUES.jack:
            return "J";
        case CARD_VALUES.queen:
            return "Q";
        case CARD_VALUES.king:
            return "K";
        case CARD_VALUES.ace:
            return "A";
        default:
            throw "Invalid card value";
    }
}
