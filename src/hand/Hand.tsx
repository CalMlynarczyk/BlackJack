import "./hand.css";

import React from "react";
import { spring, TransitionMotion } from "react-motion";
import { default as CardComponent, mapCardToCode } from "./Card";
import { Card, Hand as HandType } from "./cards";

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

interface HandProps { hand: HandType; }
interface HandState { displayHand: DisplayCard[]; }

export default class Hand extends React.Component<HandProps, HandState> {
  public readonly state: HandState = {
    displayHand: this.props.hand.map((card) => ({
      // Assign the rotation value only the first time
      // so it does not change on each re-render
      ...card,
      rotateVal: getRandomRotateVal(),
    })),
  };

  public componentDidUpdate() {
    if (this.props.hand.length <= 0 && this.state.displayHand.length > 0) {
      this.setState({ displayHand: [] });
    } else if (this.state.displayHand.length < this.props.hand.length) {
      this.setState({
        displayHand: this.state.displayHand.concat([{
          ...this.props.hand[this.props.hand.length - 1],
          rotateVal: getRandomRotateVal(),
        }]),
      });
    }
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
        {(interpolatedStyles) => (
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
        )}
      </TransitionMotion>
    );
  }
}

function getRandomRotateVal() {
  return Math.random() * 12 - 6;
}
