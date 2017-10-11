import React from "react";
import ReactDOM from "react-dom";
import Result from "./result.jsx";
import PlayerSection from "../player/playerSection.jsx";
import { init, playTurn, shouldPlayAnotherRound } from "./game.js";
import { getResult } from "./score.js";
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
        return (
            <div>
                <Result doShow={!this.state.keepPlaying} 
                    result={getResult(this.state.player, this.state.dealer)} 
                    onReset={this.init}></Result>
                <PlayerSection player={this.state.player} onPlayerAction={this.playerTurn}></PlayerSection>
                <PlayerSection player={this.state.dealer}></PlayerSection>
            </div>
        );
    }

    playerTurn(action) {
        const updatedPlayer = playTurn(this.state.player, action);
        this.setState({ player: updatedPlayer }, this.dealerTurn);
    }
    
    dealerTurn() {
        const updatedDealer = playTurn(this.state.dealer);
        const keepPlaying = shouldPlayAnotherRound(this.state.player, updatedDealer);

        this.setState({ dealer: updatedDealer, keepPlaying: keepPlaying }, () => {
            if (this.state.keepPlaying && this.state.player.status === ACTION.stand)
                this.dealerTurn();
        });
    }
}

export default function playGame(elementId) {
    ReactDOM.render(
        <Game></Game>,
        document.getElementById(elementId)
    );
}
