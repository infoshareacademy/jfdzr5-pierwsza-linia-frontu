import React from "react";

export class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chosen: "wydatki" };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(chosen) {
        this.setState({
            chosen: chosen
        });
    }

    render() {
        return (
            <>
                <h1>Budżet domowy</h1>
                <button className={`button ${this.state.chosen === "wydatki" ? "chosen" : ""}`} onClick={() => this.handleClick("wydatki")}>
                    Wydatki
                </button>
                <button className={`button ${this.state.chosen === "przychody" ? "chosen" : ""}`} onClick={() => this.handleClick("przychody")}>
                    Przychody
                </button>

            </>
        );
    }
}
