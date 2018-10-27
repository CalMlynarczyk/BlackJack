import { connect } from "react-redux";
import { playerHit, playerStand } from "../game/actions";
import { Action, PlayerType } from "./player";
import { isPlayerWinner, isDealerWinner } from "../game/score";
import PlayerSection from "./playerSection.tsx";

const mapStateToProps = (state, ownProps) => {
  return {
    player: ownProps.playerType === PlayerType.player
      ? state.players[ownProps.playerIndex]
      : state.dealer,
    playerType: ownProps.playerType,
    isWinner: 
      (ownProps.playerType === PlayerType.player
        && state.dealer.status === Action.stand
        && state.players[ownProps.playerIndex].status === Action.stand
        && isPlayerWinner(state.players[ownProps.playerIndex], state.dealer))
      || (ownProps.playerType === PlayerType.dealer
          && state.players.every(player => player.status === Action.stand)
          && state.dealer.status === Action.stand
          && isDealerWinner(state.dealer, state.players)),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPlayerAction: action => {
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
