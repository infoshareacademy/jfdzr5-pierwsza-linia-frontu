import React from "react";
import BudgetFormExpenses from "./BudgetFormExpenses";
import BudgetFormIncomes from "./BudgetFormIncomes";
import ExpensesList from "./ExpensesList";
import IncomesList from "./IncomesList";

export class MyButtons extends React.Component {
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
                <div>
                    <button className={`button expenses ${this.state.chosen === "wydatki" ? "chosen" : ""}`} onClick={() => this.handleClick("wydatki")}>
                        Wydatki
                    </button>
                    <button className={`button incomes ${this.state.chosen === "przychody" ? "chosen" : ""}`} onClick={() => this.handleClick("przychody")}>
                        Przychody
                    </button>
                </div>





            </>
        );
    }
}
