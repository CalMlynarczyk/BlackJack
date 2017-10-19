import "./game.css";

import React from "react";
import ReactDOM from "react-dom";
import PlayerSection from "../player/playerSection.jsx";
import { init, playTurn, shouldPlayAnotherRound } from "./game.js";
import { RESULT, getResult } from "./score.js";
import { ACTION } from "../player/player.js";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.playerTurn = this.playerTurn.bind(this);
        this.init = this.init.bind(this);

        this.isFirstLoad = true;
        this.state = init();
    }

    componentDidMount() {
        this.init();
    }

    init() {
        const playIfPlayerBlackjacks = () => {
            if (this.state.keepPlaying && this.state.player.status === ACTION.stand)
                this.dealerTurn();
        };

        if (!this.isFirstLoad)
            this.setState(init(), playIfPlayerBlackjacks);        
        else {
            this.isFirstLoad = false;
            playIfPlayerBlackjacks();
        }
    }

    render() {
        const gameResult = getResult(this.state.player, this.state.dealer);

        return (
            <div className="game-container">
                <h2 className={"result-message tie-message" 
                    + (gameResult !== RESULT.tie ? " hide" : "")}>Tie</h2>
                    
                <PlayerSection player={this.state.player} onPlayerAction={this.playerTurn}
                    isWinner={gameResult === RESULT.player_wins}></PlayerSection>
                <PlayerSection player={this.state.dealer} isWinner={gameResult === RESULT.dealer_wins}></PlayerSection>

                {gameResult !== RESULT.still_playing &&
                    <button onClick={this.init} className="btn">Reset</button>
                }
            </div>
        );
    }

    playerTurn(action) {
        const updatedPlayer = playTurn(this.state.player, action, this.state.dealer);
        this.setState({ player: updatedPlayer }, this.dealerTurn);
    }
    
    dealerTurn() {
        const updatedDealer =  playTurn(this.state.dealer, null, this.state.player);
        const keepPlaying = shouldPlayAnotherRound(this.state.player, updatedDealer);

        this.setState({ dealer: updatedDealer, keepPlaying: keepPlaying }, () => {
            if (this.state.keepPlaying && this.state.player.status === ACTION.stand)
                this.dealerTurn();
        });
    }
}

function printResult(result) {
    switch (result) {
        case RESULT.dealer_wins:
            return "Dealer wins";
        case RESULT.player_wins:
            return "Player wins";
        case RESULT.tie:
            return "Tie";
        case RESULT.still_playing:
            return "";
        default:
            throw "Invalid result";
    }
}

export default function playGame(elementId) {
    ReactDOM.render(
        <Game></Game>,
        document.getElementById(elementId)
    );
}
