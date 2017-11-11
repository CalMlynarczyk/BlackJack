import "./hand.css";

import React from "react";
import { TransitionMotion, spring } from "react-motion";
import { default as Card, mapCardToCode } from "./card.jsx";

// Keep the game board a consistent height using a
// hidden placeholder card element.
const placeholderCard = {
    suit: 0,
    value: { key: "two", val: 2 },
};

export default class Hand extends React.Component {
    constructor(props) {
        super(props);
    }

    willEnter() {
        return { opacity: 0, translateX: 300, rotate: 0 };
    }

    render() {
        return (
            <TransitionMotion
                willEnter={this.willEnter}
                styles={this.props.hand.map((card, index) => {
                    // Assign the rotation value only the first time
                    // so it does not change on each re-render
                    if (!card.rotateVal)
                        card.rotateVal = getRandomRotateVal();

                    return {
                        key: mapCardToCode(card),
                        style: { 
                            opacity: spring(1), 
                            translateX: spring(0), 
                            rotate: spring(card.rotateVal),
                        },
                        data: card,
                    };
                })}>
                {interpolatedStyles =>
                    <ul className="hand">
                        <Card card={placeholderCard} isHidden={true} />

                        {interpolatedStyles.map(card =>
                            <Card card={card.data} key={card.key} 
                                style={{opacity: card.style.opacity, 
                                    transform: `translateX(${card.style.translateX}px)
                                        rotate(${card.style.rotate}deg)`
                                }} />
                        )}
                    </ul>
                }
            </TransitionMotion>
        );
    }
}

function getRandomRotateVal() {
    return Math.random() * 12 - 6;
}
