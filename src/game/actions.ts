import { Action as ReduxAction, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { Action } from "../player/player";
import { GameState } from "./reducers";

export enum ActionTypes {
  PLAYER_HIT,
  PLAYER_STAND,
  DEALER_TURN,
  DEALER_HIT,
  NEXT_TURN,
  CHECK_PLAYER,
  CHECK_DEALER,
  RESET,
  SHUFFLE_DECK,
}

export interface GameAction extends ReduxAction<ActionTypes> {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

export const playerHitAction: ActionCreator<GameAction> = (index: number) => ({
  type: ActionTypes.PLAYER_HIT,
  index,
});

export const playerStandAction: ActionCreator<GameAction> = (
  index: number
) => ({
  type: ActionTypes.PLAYER_STAND,
  index,
});

export const dealerTurnAction: ActionCreator<GameAction> = () => ({
  type: ActionTypes.DEALER_TURN,
});
export const dealerHit: ActionCreator<GameAction> = () => ({
  type: ActionTypes.DEALER_HIT,
});

export const checkPlayer: ActionCreator<GameAction> = (index: number) => ({
  type: ActionTypes.CHECK_PLAYER,
  index,
});

export const checkDealer: ActionCreator<GameAction> = () => ({
  type: ActionTypes.CHECK_DEALER,
});
export const nextTurn: ActionCreator<GameAction> = () => ({
  type: ActionTypes.NEXT_TURN,
});

export const reset: ActionCreator<GameAction> = () => ({
  type: ActionTypes.RESET,
});

export const shuffleDeck: ActionCreator<GameAction> = () => ({
  type: ActionTypes.SHUFFLE_DECK,
});

function dealerTurn(): ThunkAction<void, GameState, void, GameAction> {
  return (dispatch, getState) => {
    if (getState().dealer.status === Action.stand) {
      dispatch(nextTurn());
    } else {
      dispatch(dealerTurnAction());

      if (
        getState().players.every((player) => player.status === Action.stand)
      ) {
        dispatch(dealerTurnAction());
        dispatch(dealerTurn());
      }
    }
  };
}

export function playerHit(
  index: number,
  noDealerTurn = false
): ThunkAction<void, GameState, void, GameAction> {
  return (dispatch, getState) => {
    dispatch(playerHitAction(index));

    const state = getState();

    if (
      !noDealerTurn &&
      state.playerTurn < 0 &&
      (state.dealer.status === Action.hit ||
        state.players.some((player) => player.status === Action.hit))
    ) {
      dispatch(dealerTurn());
    }
  };
}

export function playerStand(
  index: number
): ThunkAction<void, GameState, void, GameAction> {
  return (dispatch, getState) => {
    dispatch(playerStandAction(index));

    const state = getState();

    if (
      state.playerTurn < 0 &&
      (state.dealer.status === Action.hit ||
        state.players.some((player) => player.status === Action.hit))
    ) {
      dispatch(dealerTurn());
    }
  };
}
