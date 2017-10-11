import "./result.css";

import React from "react";
import { RESULT } from "./score.js";

export default class Result extends React.Component {
    constructor(props) {
        super(props);

        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className={"result-message" + (!this.props.doShow ? " hide" : "")}>
                <h3>{printResult(this.props.result)}</h3>
                <button onClick={this.reset} className="btn">Reset</button>
            </div>
        );
    }

    reset() {
        this.props.onReset();
    }
}

function printResult(result) {
    switch (result) {
        case RESULT.dealer_wins:
            return "Dealer wins";
        case RESULT.player_wins:
            return "Player wins";
        case RESULT.tie:
            return "Tie";
        default:
            throw "Invalid result";
    }
}
