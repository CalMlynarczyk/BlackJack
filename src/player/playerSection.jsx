import "./playerSection.css";

import React from "react";
import { ACTION, PLAYER_TYPE } from "./player.js";
import { MAX_SCORE, getFinalHandValue } from "../game/score.js";
import Hand from "../hand/hand.jsx";

export default class PlayerSection extends React.Component {
    constructor(props) {
        super(props);

        this.hit = this.hit.bind(this);
        this.stand = this.stand.bind(this);
    }

    render() {
        const player = this.props.player;
        const score = getFinalHandValue(player.hand);

        return (
            <section className="player-section">
                <h2 className={"result-message winner-message" + (this.props.isWinner ? "" : " hide")}>Winner</h2>

                <div className="player-section__board">
                    <div>
                        <h2 className="player-header">{getPlayerTypeLabel(player.type)}</h2>
                        <h2 className={"player-score" + (score > MAX_SCORE ? " player-score--bust" : "")}>{score}</h2>
                        
                        {player.type === PLAYER_TYPE.player && player.status !== ACTION.stand &&
                            <div className="player-controls">
                                <button onClick={this.hit} className="btn btn--green">Hit</button>
                                <button onClick={this.stand} className="btn btn--red">Stand</button>
                            </div>
                        }

                        {player.status === ACTION.stand &&
                            <div className="player-controls">
                                <h4 className="player-status">{getActionLabel(player.status)}</h4>
                            </div>
                        }
                    </div>
                    <Hand hand={player.hand}></Hand>
                </div>
            </section>
        );
    }

    hit() {
        this.playerActionTaken(ACTION.hit);
    }

    stand() {
        this.playerActionTaken(ACTION.stand);
    }

    playerActionTaken(action) {
        this.props.onPlayerAction(action);
    }
}

function getPlayerTypeLabel(playerType) {
    switch (playerType) {
        case PLAYER_TYPE.player:
            return "Player";
        case PLAYER_TYPE.dealer:
            return "Dealer";
        default:
            throw "Invalid player type"
    }
}

function getActionLabel(action) {
    switch (action) {
        case ACTION.hit:
            return "Hit";
        case ACTION.stand:
            return "Stand";
        default:
            throw "Invalid action"
    }
}
