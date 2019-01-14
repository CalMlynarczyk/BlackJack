import "./game.css";

import React from "react";
import { render } from "react-dom";
import { connect, MapDispatchToProps, MapStateToProps, Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk, { ThunkDispatch } from "redux-thunk";
import { Player, PlayerType } from "../player/player";
import { ConnectedDealerSection, ConnectedPlayerSection } from "../player/PlayerSection";
import { checkDealer, checkPlayer, dealerHit, GameAction, playerHit, reset, shuffleDeck } from "./actions";
import blackjackApp, { GameState } from "./reducers";
import { isTie } from "./score";
import { isStillPlaying } from "./store";

const store = createStore(blackjackApp, composeWithDevTools(applyMiddleware(ReduxThunk)));

export interface GameStateProps {
  dealer: Player;
  players: Player[];
}

export interface GameDispatchProps {
  onReset: () => void;
}

export interface GameProps extends GameStateProps, GameDispatchProps {}

class Game extends React.Component<GameProps> {
  public componentDidMount() {
    this.props.onReset();
  }

  public render() {
    const { dealer, players, onReset } = this.props;
    const isTieValue = isTie(dealer, players);

    return (
      <div className="game-container">
        <h2 className={`result-message tie-message ${isTieValue ? "" : "hide"}`}>Tie</h2>

        <ConnectedPlayerSection playerType={PlayerType.player} playerIndex={0} />
        <ConnectedDealerSection playerType={PlayerType.dealer} />

        {(true || isStillPlaying(dealer, players)) &&
          <button onClick={onReset} className="btn">Reset</button>
        }
      </div>
    );
  }
}

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
        dispatch(shuffleDeck());
        dispatch(playerHit(0, true));

        timerIds.push(setTimeout(() => {
          dispatch(dealerHit());

          timerIds.push(setTimeout(() => {
            dispatch(playerHit(0, true));

            timerIds.push(setTimeout(() => dispatch(dealerHit()), dealInterval));
          }, dealInterval));
        }, dealInterval));

        dispatch(checkPlayer(0));
        dispatch(checkDealer());
      },
    };
  };

const ConnectedGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default function playGame(elementId: string) {
  render(
    <Provider store={store}>
      <ConnectedGameContainer />
    </Provider>,
    document.getElementById(elementId),
  );
}
