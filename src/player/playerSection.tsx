import "./playerSection.css";

import React from "react";
import hitSound from "../audio/audioLoader";
import { getFinalHandValue, MAX_SCORE } from "../game/score";
import Hand from "../hand/hand";
import { Action, Player, PlayerType } from "./player";

export interface PlayerSectionStateProps {
  player: Player;
  isWinner: boolean;
}

export interface PlayerSectionDispatchProps {
  onPlayerAction: (action: Action) => void;
}

export interface PlayerSectionProps extends PlayerSectionStateProps, PlayerSectionDispatchProps {}

const PlayerSection: React.SFC<PlayerSectionProps> = ({ player, isWinner, onPlayerAction }) => {
  const playerTypeLabel = (() => {
    switch (player.type) {
      case PlayerType.player:
        return "Player";
      case PlayerType.dealer:
        return "Dealer";
      default:
        throw new Error(`Invalid player type: ${player.type}`);
    }
  })();

  const hit = () => {
    hitSound().play();
    onPlayerAction(Action.hit);
  };

  const stand = () => {
    onPlayerAction(Action.stand);
  };

  const score = getFinalHandValue(player.hand);

  return (
    <section className="player-section">
      <h2 className={`result-message winner-message ${isWinner ? "" : " hide"}`}>Winner</h2>

      <div className="player-section__board">
        <div>
          <h2 className="player-header">{playerTypeLabel}</h2>
          <h2 className={`player-score ${score > MAX_SCORE ? " player-score--bust" : ""}`}>{score}</h2>

          {player.type === PlayerType.player && player.status !== Action.stand &&
            <div className="player-controls">
              <button onClick={hit} className="btn btn--green">Hit</button>
              <button onClick={stand} className="btn btn--red">Stand</button>
            </div>
          }

          {player.status === Action.stand &&
            <div className="player-controls">
              <h4 className="player-status">Stand</h4>
            </div>
          }
        </div>
        <Hand hand={player.hand} />
      </div>
    </section>
  );
};

export default PlayerSection;
