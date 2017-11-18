import "./game.css";

import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import ReduxThunk from "redux-thunk";
import blackjackApp from "./reducers";
import PlayerSectionContainer from "../player/PlayerSectionContainer";
import { isStillPlaying } from "./game";
import { RESULT, isTie } from "./score";
import { playerHit, dealerHit, reset, checkPlayer, checkDealer } from "./actions";
import { ACTION, PLAYER_TYPE } from "../player/player";

let store = createStore(blackjackApp, applyMiddleware(ReduxThunk));

const Game = ({ dealer, players, onReset }) => {
    const isTieValue = isTie(dealer, players);

    return (
        <div className="game-container">
            <h2 className={"result-message tie-message" 
                + (isTieValue ? "" : " hide")}>Tie</h2>
                
            <PlayerSectionContainer playerIndex={0} playerType={PLAYER_TYPE.player} />
            <PlayerSectionContainer playerType={PLAYER_TYPE.dealer} />

            {(true || isStillPlaying(dealer, players)) &&
                <button onClick={onReset} className="btn">Reset</button>
            }
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        dealer: state.dealer,
        players: state.players,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    // Track all timed actions so we can cancel them
    // if another reset is triggered.
    let timerIds = [];

    return {
        onReset: () => {
            // Cancel all previous timed actions
            timerIds.forEach(clearTimeout);
            timerIds = [];

            const dealInterval = 550;

            // Initial deal
            dispatch(reset());
            dispatch(playerHit(0, false));

            timerIds.push(setTimeout(() => {
                dispatch(dealerHit());

                timerIds.push(setTimeout(() => {
                    dispatch(playerHit(0, false));

                    timerIds.push(setTimeout(() => dispatch(dealerHit()), dealInterval));
                }, dealInterval));
            }, dealInterval));

            dispatch(checkPlayer(0));
            dispatch(checkDealer());
        },
    };
};

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);

export default function playGame(elementId) {
    render(
        <Provider store={store}>
            <GameContainer />
        </Provider>,
        document.getElementById(elementId),
    );
}
