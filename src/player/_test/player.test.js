import { describe, it } from "mocha";
import { expect } from "chai";

import { PLAYER_TYPE, ACTION, doesPlayerStand } from "../player.js";
import { CardSuit, CardValue, createCard } from "../../hand/cards.ts";

describe("Player module", () => {
  describe("Dealer", () => {
    it("should stand when score is 17 or above", () => {
      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CardSuit.Spade, CardValue.Ten),
          createCard(CardSuit.Spade, CardValue.Ten),
        ]
      };

      const result = doesPlayerStand(dealer);

      expect(result).to.be.true;
    });

    it("should hit when score is below 17", () => {
      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CardSuit.Spade, CardValue.Ten),
          createCard(CardSuit.Spade, CardValue.Five),
        ]
      };

      const result = doesPlayerStand(dealer);

      expect(result).to.be.false;
    });

    it("should stand when other player busts", () => {
      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CardSuit.Diamond, CardValue.Ten),
          createCard(CardSuit.Spade, CardValue.Five),
        ]
      };

      const player = {
        type: PLAYER_TYPE.player,
        action: ACTION.stand,
        hand: [
          createCard(CardSuit.Spade, CardValue.Ten),
          createCard(CardSuit.Heart, CardValue.Ten),
          createCard(CardSuit.Club, CardValue.Ten),
        ]
      };

      const result = doesPlayerStand(dealer, player);

      expect(result).to.be.true;
    });

    it("should stand when hand total is higher than other player's hand", () => {
      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CardSuit.Diamond, CardValue.Ten),
          createCard(CardSuit.Spade, CardValue.Eight),
        ]
      };

      const player = {
        type: PLAYER_TYPE.player,
        action: ACTION.stand,
        hand: [
          createCard(CardSuit.Spade, CardValue.Ten),
          createCard(CardSuit.Club, CardValue.Four),
          createCard(CardSuit.Club, CardValue.Two),
        ]
      };

      const result = doesPlayerStand(dealer, player);

      expect(result).to.be.true;
    });

    it("should hit when hand total is lower than other player's hand and 17", () => {
      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CardSuit.Diamond, CardValue.Ten),
          createCard(CardSuit.Spade, CardValue.Four),
        ]
      };

      const player = {
        type: PLAYER_TYPE.player,
        action: ACTION.stand,
        hand: [
          createCard(CardSuit.Spade, CardValue.Ten),
          createCard(CardSuit.Club, CardValue.Eight),
          createCard(CardSuit.Club, CardValue.Two),
        ]
      };

      const result = doesPlayerStand(dealer, player);

      expect(result).to.be.false;
    });
  });

  describe("Player", () => {
    it("should stand when dealer busts", () => {
      const player = {
        type: PLAYER_TYPE.player,
        action: ACTION.stand,
        hand: [
          createCard(CardSuit.Spade, CardValue.Ten),
          createCard(CardSuit.Club, CardValue.Eight),
          createCard(CardSuit.Club, CardValue.Two),
        ]
      };

      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CardSuit.Diamond, CardValue.Ten),
          createCard(CardSuit.Spade, CardValue.Ten),
          createCard(CardSuit.Spade, CardValue.Five),
        ]
      };

      const result = doesPlayerStand(player, dealer);

      expect(result).to.be.true;
    });
  });
});
