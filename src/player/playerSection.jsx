import "./playerSection.css";

import React from "react";
import { ACTION, PLAYER_TYPE } from "./player";
import { MAX_SCORE, getFinalHandValue } from "../game/score";
import Hand from "../hand/hand.jsx";
import hitSound from "../audio/audioLoader";

const PlayerSection = ({ player, playerType, isWinner, onPlayerAction }) => {
    const playerTypeLabel = (() => {
        switch (playerType) {
            case PLAYER_TYPE.player:
                return "Player";
            case PLAYER_TYPE.dealer:
                return "Dealer";
            default:
                throw `Invalid player type: ${playerType}`;
        }
    })();

    const hit = () => {
        hitSound().play();
        onPlayerAction(ACTION.hit);
    };

    const stand = () => {
        onPlayerAction(ACTION.stand);
    };

    const score = getFinalHandValue(player.hand);

    return (
        <section className="player-section">
            <h2 className={`result-message winner-message ${isWinner ? "" : " hide"}`}>Winner</h2>

            <div className="player-section__board">
                <div>
                    <h2 className="player-header">{playerTypeLabel}</h2>
                    <h2 className={`player-score ${score > MAX_SCORE ? " player-score--bust" : ""}`}>{score}</h2>
                    
                    {playerType === PLAYER_TYPE.player && player.status !== ACTION.stand &&
                        <div className="player-controls">
                            <button onClick={hit} className="btn btn--green">Hit</button>
                            <button onClick={stand} className="btn btn--red">Stand</button>
                        </div>
                    }

                    {player.status === ACTION.stand &&
                        <div className="player-controls">
                            <h4 className="player-status">Stand</h4>
                        </div>
                    }
                </div>
                <Hand hand={player.hand}></Hand>
            </div>
        </section>
    );
};

export default PlayerSection;
