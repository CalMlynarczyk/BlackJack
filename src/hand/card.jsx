import React from "react";
import { CARD_SUITS, CARD_VALUES } from "./cards";

const Card = ({ card }) => {
    return (
        <li><img src={`${SVG_CARD_DIR}${mapCardToCode(card)}.svg`} /></li>
    );
};

export default Card;

const SVG_CARD_DIR = "Vector-Playing-Cards/cards-svg/";

export function mapCardToCode(card) {
    const suitCode = mapSuitToCode(card.suit);
    const valueCode = mapValueToCode(card.value);

    return `${valueCode}${suitCode}`;
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

function mapValueToCode(cardValue) {
    switch (cardValue.key) {
        case CARD_VALUES.two.key:
        case CARD_VALUES.three.key:
        case CARD_VALUES.four.key:
        case CARD_VALUES.five.key:
        case CARD_VALUES.six.key:
        case CARD_VALUES.seven.key:
        case CARD_VALUES.eight.key:
        case CARD_VALUES.nine.key:
        case CARD_VALUES.ten.key:
            return cardValue.val;
        case CARD_VALUES.jack.key:
            return "J";
        case CARD_VALUES.queen.key:
            return "Q";
        case CARD_VALUES.king.key:
            return "K";
        case CARD_VALUES.ace.key:
            return "A";
        default:
            throw "Invalid card value";
    }
}
