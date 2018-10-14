import React from "react";
import { CardSuit, CardValue, mapCardValues } from "./cards.ts";

const Card = ({ card, isHidden, style }) => {
  return (
    <li className={`card ${isHidden ? "card__placeholder" : ""}`} style={style}>
      <img src={`${SVG_CARD_DIR}${mapCardToCode(card)}.svg`} />
    </li>
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
    case CardSuit.Club:
      return "C";
    case CardSuit.Diamond:
      return "D";
    case CardSuit.Heart:
      return "H";
    case CardSuit.Spade:
      return "S";
    default:
      throw "Invalid card suit";
  }
}

function mapValueToCode(cardValue) {
  switch (cardValue) {
    case CardValue.Two:
    case CardValue.Three:
    case CardValue.Four:
    case CardValue.Five:
    case CardValue.Six:
    case CardValue.Seven:
    case CardValue.Eight:
    case CardValue.Nine:
    case CardValue.Ten:
      return `${mapCardValues.get(cardValue)}`;
    case CardValue.Jack:
      return "J";
    case CardValue.Queen:
      return "Q";
    case CardValue.King:
      return "K";
    case CardValue.Ace:
      return "A";
    default:
      throw "Invalid card value";
  }
}
