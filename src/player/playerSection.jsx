import React from "react";
import ReactDOM from "react-dom";
import { ACTION, PLAYER_TYPE } from "./player.js";
import { getFinalHandValue } from "./score.js";
import Hand from "../hand/hand.jsx";

class PlayerSection extends React.Component {
    constructor(props) {
        super(props);

        this.hit = this.hit.bind(this);
        this.stand = this.stand.bind(this);
    }

    render() {
        const player = this.props.player;

        return (
            <section>
                <h2>{getPlayerTypeLabel(player.type)}</h2>
                <div className="hand">
                    <Hand hand={player.hand}></Hand>
                    <h4>{getActionLabel(player.status)}</h4>
                    <h3 className="player-score">Score: {getFinalHandValue(player.hand)}</h3>
                </div>

                {player.type === PLAYER_TYPE.player && player.status !== ACTION.stand &&
                    <div>
                        <button onClick={this.hit}>Hit</button>
                        <button onClick={this.stand}>Stand</button>
                    </div>
                }
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

export default function renderPlayerSection(player, onPlayerAction, elementId) {
    ReactDOM.render(
        <PlayerSection player={player} onPlayerAction={onPlayerAction}></PlayerSection>,
        document.getElementById(elementId)
    );
}