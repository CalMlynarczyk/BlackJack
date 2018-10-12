import { connect } from "react-redux";
import { playerHit, playerStand } from "../game/actions";
import { ACTION, PLAYER_TYPE } from "./player";
import { isPlayerWinner, isDealerWinner } from "../game/score";
import PlayerSection from "./playerSection.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    player: ownProps.playerType === PLAYER_TYPE.player
      ? state.players[ownProps.playerIndex]
      : state.dealer,
    playerType: ownProps.playerType,
    isWinner: 
            (ownProps.playerType === PLAYER_TYPE.player
                && state.dealer.status === ACTION.stand
                && state.players[ownProps.playerIndex].status === ACTION.stand
                && isPlayerWinner(state.players[ownProps.playerIndex], state.dealer))
            || (ownProps.playerType === PLAYER_TYPE.dealer
                && state.players.every(player => player.status === ACTION.stand)
                && state.dealer.status === ACTION.stand
                && isDealerWinner(state.dealer, state.players)),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPlayerAction: action => {
      action === ACTION.hit
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
