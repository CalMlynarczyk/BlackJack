import chai from "chai";
const expect = chai.expect;

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
    });
});
