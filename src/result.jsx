import React from "react";
import ReactDOM from "react-dom";
import { RESULT } from "./player/score.js";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="results">
                {this.props.doShow &&
                    <h3 className="results">{printResult(this.props.result)}</h3>
                }
                {this.props.doShow &&
                    <button onClick={this.reset}>Reset</button>
                }
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

export default function renderResultSection(result, doShow, onReset, elementId) {
    ReactDOM.render(
        <Result result={result} doShow={doShow} onReset={onReset}></Result>,
        document.getElementById(elementId)
    );
}
