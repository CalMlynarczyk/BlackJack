import React from "react";
import { Card as CardEnum, CardSuit, CardValue, mapCardValues } from "./cards";

const SVG_CARD_DIR = "Vector-Playing-Cards/cards-svg/";

function mapSuitToCode(suit: CardSuit) {
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
      throw new Error("Invalid card suit");
  }
}

function mapValueToCode(cardValue: CardValue) {
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
      throw new Error("Invalid card value");
  }
}

export function mapCardToCode(card: CardEnum) {
  const suitCode = mapSuitToCode(card.suit);
  const valueCode = mapValueToCode(card.value);

  return `${valueCode}${suitCode}`;
}

interface CardProps {
  card: CardEnum;
  isHidden?: boolean;
  style?: object;
}

const Card: React.FC<CardProps> = ({ card, isHidden, style }) => (
  <li className={`card ${isHidden ? "card--placeholder" : ""}`} style={style}>
    <img src={`${SVG_CARD_DIR}${mapCardToCode(card)}.svg`} />
  </li>
);

export default Card;
