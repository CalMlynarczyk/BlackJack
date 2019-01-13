import "./game.css";

import React from "react";
import { render } from "react-dom";
import { connect, MapDispatchToProps, MapStateToProps, Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk, { ThunkDispatch } from "redux-thunk";
import { Action, Player } from "../player/player";
import PlayerSection from "../player/PlayerSection";
import { checkDealer, checkPlayer, dealerHit, GameAction, playerHit, playerStand, reset } from "./actions";
import blackjackApp, { GameState } from "./reducers";
import { isDealerWinner, isPlayerWinner, isTie } from "./score";
import { isStillPlaying } from "./store";

const store = createStore(blackjackApp, composeWithDevTools(applyMiddleware(ReduxThunk)));

export interface GameStateProps {
  dealer: Player;
  players: Player[];
}

export interface GameDispatchProps {
  onReset: () => void;
  onPlayerAction: (action: Action) => void;
}

export interface GameProps extends GameStateProps, GameDispatchProps {}

const Game: React.SFC<GameProps> = ({ dealer, players, onReset, onPlayerAction }) => {
  const isTieValue = isTie(dealer, players);
  const currentPlayer = players[0];

  return (
    <div className="game-container">
      <h2 className={`result-message tie-message ${isTieValue ? "" : "hide"}`}>Tie</h2>

      <PlayerSection
        player={currentPlayer}
        isWinner={
          dealer.status === Action.stand
            && currentPlayer.status === Action.stand
            && isPlayerWinner(currentPlayer, dealer)
        }
        onPlayerAction={onPlayerAction}
      />
      <PlayerSection
        player={dealer}
        isWinner={
          players.every((player) => player.status === Action.stand)
            && dealer.status === Action.stand
            && isDealerWinner(dealer, players)
        }
        onPlayerAction={onPlayerAction}
      />

      {(true || isStillPlaying(dealer, players)) &&
        <button onClick={onReset} className="btn">Reset</button>
      }
    </div>
  );
};

const mapStateToProps: MapStateToProps<GameStateProps, {}, GameState> = (state) => ({
  dealer: state.dealer,
  players: state.players,
});

const mapDispatchToProps: MapDispatchToProps<GameDispatchProps, {}> =
  (dispatch: ThunkDispatch<GameState, void, GameAction>) => {
    // Track all timed actions so we can cancel them
    // if another reset is triggered.
    let timerIds: NodeJS.Timeout[] = [];

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
      onPlayerAction: (action: Action) => {
        action === Action.hit
          ? dispatch(playerHit(0))
          : dispatch(playerStand(0));
      },
    };
  };

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default function playGame(elementId: string) {
  render(
    <Provider store={store}>
      <GameContainer />
    </Provider>,
    document.getElementById(elementId),
  );
}
