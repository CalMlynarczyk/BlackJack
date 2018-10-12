import { describe, it } from "mocha";
import { expect } from "chai";

import { PLAYER_TYPE, ACTION, doesPlayerStand } from "../player.js";
import { CARD_SUITS, CARD_VALUES, createCard } from "../../hand/cards.js";

describe("Player module", () => {
  describe("Dealer", () => {
    it("should stand when score is 17 or above", () => {
      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
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
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
          createCard(CARD_SUITS.spade, CARD_VALUES.five),
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
          createCard(CARD_SUITS.diamond, CARD_VALUES.ten),
          createCard(CARD_SUITS.spade, CARD_VALUES.five),
        ]
      };

      const player = {
        type: PLAYER_TYPE.player,
        action: ACTION.stand,
        hand: [
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
          createCard(CARD_SUITS.heart, CARD_VALUES.ten),
          createCard(CARD_SUITS.club, CARD_VALUES.ten),
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
          createCard(CARD_SUITS.diamond, CARD_VALUES.ten),
          createCard(CARD_SUITS.spade, CARD_VALUES.eight),
        ]
      };

      const player = {
        type: PLAYER_TYPE.player,
        action: ACTION.stand,
        hand: [
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
          createCard(CARD_SUITS.club, CARD_VALUES.four),
          createCard(CARD_SUITS.club, CARD_VALUES.two),
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
          createCard(CARD_SUITS.diamond, CARD_VALUES.ten),
          createCard(CARD_SUITS.spade, CARD_VALUES.four),
        ]
      };

      const player = {
        type: PLAYER_TYPE.player,
        action: ACTION.stand,
        hand: [
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
          createCard(CARD_SUITS.club, CARD_VALUES.eight),
          createCard(CARD_SUITS.club, CARD_VALUES.two),
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
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
          createCard(CARD_SUITS.club, CARD_VALUES.eight),
          createCard(CARD_SUITS.club, CARD_VALUES.two),
        ]
      };

      const dealer = {
        type: PLAYER_TYPE.dealer,
        action: ACTION.hit,
        hand: [
          createCard(CARD_SUITS.diamond, CARD_VALUES.ten),
          createCard(CARD_SUITS.spade, CARD_VALUES.ten),
          createCard(CARD_SUITS.spade, CARD_VALUES.five),
        ]
      };

      const result = doesPlayerStand(player, dealer);

      expect(result).to.be.true;
    });
  });
});
