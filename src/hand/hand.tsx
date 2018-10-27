import "./hand.css";

import * as React from "react";
import { spring, TransitionMotion } from "react-motion";
import { default as CardComponent, mapCardToCode } from "./card";
import { Card } from "./cards";

// Keep the game board a consistent height using a
// hidden placeholder card element.
const placeholderCard: Card = {
  suit: 0,
  value: 0,
};

const willEnter = () => ({
  opacity: 0,
  rotate: 0,
  translateX: 300,
});

interface DisplayCard extends Card { rotateVal: number; }

interface HandProps { hand: Card[]; }

export default class Hand extends React.Component<HandProps, {displayHand: DisplayCard[]}> {
  constructor(props) {
    super(props);

    this.state = {
      displayHand: this.props.hand.map((card) => ({
        // Assign the rotation value only the first time
        // so it does not change on each re-render
        ...card,
        rotateVal: getRandomRotateVal(),
      })),
    };
  }

  public render() {
    return (
      <TransitionMotion
        willEnter={willEnter}
        styles={this.state.displayHand.map((card) => ({
          data: card,
          key: mapCardToCode(card),
          style: {
            opacity: spring(1),
            rotate: spring(card.rotateVal),
            translateX: spring(0),
          },
        }))}
      >
        {(interpolatedStyles) =>
          <ul className="hand">
            <CardComponent card={placeholderCard} isHidden={true} />

            {interpolatedStyles.map((card) => (
              <CardComponent
                card={card.data}
                key={card.key}
                style={
                  {
                    opacity: card.style.opacity,
                    transform: `translateX(${card.style.translateX}px) rotate(${card.style.rotate}deg)`,
                  }
                }
              />
            ))}
          </ul>
        }
      </TransitionMotion>
    );
  }
}

function getRandomRotateVal() {
  return Math.random() * 12 - 6;
}
