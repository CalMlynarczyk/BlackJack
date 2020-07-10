import "./playerSection.css";

import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import hitSound from "../audio/audioLoader";
import { GameAction, playerHit, playerStand } from "../game/actions";
import { GameState } from "../game/reducers";
import {
  getFinalHandValue,
  isDealerWinner,
  isPlayerWinner,
  MAX_SCORE,
} from "../game/score";
import Hand from "../hand/Hand";
import { Action, Player, PlayerType } from "./player";

export type PlayerSectionStateProps = {
  player: Player;
  playerType: PlayerType;
  isWinner: boolean;
  showControls: boolean;
};

export type PlayerSectionDispatchProps = {
  onHit?: () => void;
  onStand?: () => void;
};

type PlayerSectionProps = PlayerSectionStateProps & PlayerSectionDispatchProps;

const hit = (onHit: () => void) => () => {
  hitSound().play();
  onHit();
};

const stand = (onStand: () => void) => () => {
  onStand();
};

class PlayerSection extends React.Component<PlayerSectionProps> {
  render() {
    const {
      player,
      playerType,
      isWinner,
      showControls = false,
      onHit = () => null,
      onStand = () => null,
    } = this.props;
    const playerTypeLabel = (() => {
      switch (playerType) {
        case PlayerType.player:
          return "Player";
        case PlayerType.dealer:
          return "Dealer";
        default:
          throw new Error(`Invalid player type: ${playerType}`);
      }
    })();

    const score = getFinalHandValue(player.hand);

    return (
      <section className="player-section">
        <h2
          className={`result-message winner-message ${isWinner ? "" : " hide"}`}
        >
          Winner
        </h2>

        <div className="player-section__board">
          <div>
            <h2 className="player-header">{playerTypeLabel}</h2>
            <h2
              className={`player-score ${
                score > MAX_SCORE ? " player-score--bust" : ""
              }`}
            >
              {score}
            </h2>

            {showControls && (
              <div className="player-controls">
                <button onClick={hit(onHit)} className="btn btn--green">
                  Hit
                </button>
                <button onClick={stand(onStand)} className="btn btn--red">
                  Stand
                </button>
              </div>
            )}

            {player.status === Action.stand && (
              <div className="player-controls">
                <h4 className="player-status">Stand</h4>
              </div>
            )}
          </div>
          <Hand hand={player.hand} />
        </div>
      </section>
    );
  }
}

export default PlayerSection;

interface PlayerSectionOwnProps {
  playerType: PlayerType;
}

interface PlayerSectionOwnPropsPlayer extends PlayerSectionOwnProps {
  playerIndex: number;
}

const mapStateToPropsPlayer: MapStateToProps<
  PlayerSectionStateProps,
  PlayerSectionOwnPropsPlayer,
  GameState
> = (state, ownProps) => {
  const currentPlayer = state.players[ownProps.playerIndex];

  return {
    player: currentPlayer,
    playerType: ownProps.playerType,
    isWinner:
      state.dealer.status === Action.stand &&
      currentPlayer.status === Action.stand &&
      isPlayerWinner(currentPlayer, state.dealer),
    showControls:
      currentPlayer.status !== Action.stand &&
      state.dealer.hand.length >= 2 &&
      state.players.every((player) => player.hand.length >= 2),
  };
};

const mapDispatchToPropsPlayer: MapDispatchToProps<
  PlayerSectionDispatchProps,
  PlayerSectionOwnPropsPlayer
> = (dispatch: ThunkDispatch<GameState, void, GameAction>, ownProps) => ({
  onHit: () => dispatch(playerHit(ownProps.playerIndex)),
  onStand: () => dispatch(playerStand(ownProps.playerIndex)),
});

export const ConnectedPlayerSection = connect(
  mapStateToPropsPlayer,
  mapDispatchToPropsPlayer
)(PlayerSection);

const mapStateToPropsDealer: MapStateToProps<
  PlayerSectionStateProps,
  PlayerSectionOwnProps,
  GameState
> = (state, ownProps) => ({
  player: state.dealer,
  playerType: ownProps.playerType,
  isWinner:
    state.players.every((player) => player.status === Action.stand) &&
    state.dealer.status === Action.stand &&
    isDealerWinner(state.dealer, state.players),
  showControls: false,
});

export const ConnectedDealerSection = connect(mapStateToPropsDealer)(
  PlayerSection
);
