import { describe, it } from "mocha";
import { expect } from "chai";

import { CardSuit, CardValue, createCard } from "../../hand/cards.ts";
import { getFinalHandValue } from "../score.ts";

describe("Scores module", () => {
  describe("Hand total", () => {
    it("should use face values when no Aces are present", () => {
      const hand = [
        createCard(CardSuit.Spade, CardValue.Four),
        createCard(CardSuit.Heart, CardValue.Six),
        createCard(CardSuit.Spade, CardValue.Five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(15);
    });

    it("should use the high value when an Ace is present", () => {
      const hand = [
        createCard(CardSuit.Spade, CardValue.Ace),
        createCard(CardSuit.Spade, CardValue.Five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(16);
    });

    it("should only use the high value for a single Ace", () => {
      const hand = [
        createCard(CardSuit.Spade, CardValue.Ace),
        createCard(CardSuit.Heart, CardValue.Ace),
        createCard(CardSuit.Spade, CardValue.Five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(17);
    });

    it("should use the lower value for an Ace if total is above 21", () => {
      const hand = [
        createCard(CardSuit.Spade, CardValue.Ace),
        createCard(CardSuit.Heart, CardValue.Ten),
        createCard(CardSuit.Spade, CardValue.Five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(16);
    });

    it("should use the lower value for an Ace when multiple Aces present if total is above 21", () => {
      const hand = [
        createCard(CardSuit.Spade, CardValue.Ace),
        createCard(CardSuit.Heart, CardValue.Ace),
        createCard(CardSuit.Heart, CardValue.Six),
        createCard(CardSuit.Spade, CardValue.Five),
      ];

      const handTotal = getFinalHandValue(hand);

      expect(handTotal).to.equal(13);
    });
  });
});
