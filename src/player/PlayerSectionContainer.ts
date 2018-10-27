import { connect } from "react-redux";
import { playerHit, playerStand } from "../game/actions";
import { isDealerWinner, isPlayerWinner } from "../game/score";
import { Action, PlayerType } from "./player";
import PlayerSection, { PlayerSectionProps } from "./playerSection";

const mapStateToProps = (state, ownProps: PlayerSectionProps) => {
  return {
    isWinner:
      (ownProps.playerType === PlayerType.player
        && state.dealer.status === Action.stand
        && state.players[ownProps.playerIndex].status === Action.stand
        && isPlayerWinner(state.players[ownProps.playerIndex], state.dealer))
      || (ownProps.playerType === PlayerType.dealer
          && state.players.every((player) => player.status === Action.stand)
          && state.dealer.status === Action.stand
          && isDealerWinner(state.dealer, state.players)),
    player: ownProps.playerType === PlayerType.player
      ? state.players[ownProps.playerIndex]
      : state.dealer,
    playerType: ownProps.playerType,
  };
};

const mapDispatchToProps = (dispatch, ownProps: PlayerSectionProps) => {
  return {
    onPlayerAction: (action: Action) => {
      action === Action.hit
        ? dispatch(playerHit(ownProps.playerIndex))
        : dispatch(playerStand(ownProps.playerIndex));
    },
  };
};

const PlayerSectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerSection);

export default PlayerSectionContainer;
