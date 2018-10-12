import { describe, it } from "mocha";
import { expect } from "chai";

import { CARD_SUITS, CARD_VALUES, createCard } from "../../hand/cards.js";
import { getFinalHandValue } from "../score.js";

describe("Scores module", () => {
  describe("Hand total", () => {
    it("should use face values when no Aces are present", () => {
      const hand = [
        createCard(CARD_SUITS.spade, CARD_VALUES.four),
        createCard(CARD_SUITS.heart, CARD_VALUES.six),
        createCard(CARD_SUITS.spade, CARD_VALUES.five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(15);
    });

    it("should use the high value when an Ace is present", () => {
      const hand = [
        createCard(CARD_SUITS.spade, CARD_VALUES.ace),
        createCard(CARD_SUITS.spade, CARD_VALUES.five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(16);
    });

    it("should only use the high value for a single Ace", () => {
      const hand = [
        createCard(CARD_SUITS.spade, CARD_VALUES.ace),
        createCard(CARD_SUITS.heart, CARD_VALUES.ace),
        createCard(CARD_SUITS.spade, CARD_VALUES.five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(17);
    });

    it("should use the lower value for an Ace if total is above 21", () => {
      const hand = [
        createCard(CARD_SUITS.spade, CARD_VALUES.ace),
        createCard(CARD_SUITS.heart, CARD_VALUES.ten),
        createCard(CARD_SUITS.spade, CARD_VALUES.five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(16);
    });

    it("should use the lower value for an Ace when multiple Aces present if total is above 21", () => {
      const hand = [
        createCard(CARD_SUITS.spade, CARD_VALUES.ace),
        createCard(CARD_SUITS.heart, CARD_VALUES.ace),
        createCard(CARD_SUITS.heart, CARD_VALUES.six),
        createCard(CARD_SUITS.spade, CARD_VALUES.five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(13);
    });
  });
});
