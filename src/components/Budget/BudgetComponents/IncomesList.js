import React from "react";

function IncomesList(props) {
    return (
        <div className="income-container">
            <ul className="income-list">
                {
                    props.incomes.map((income) => {
                        return (
                            <li className="incomes" key={income.id}>
                                <span className="income-amount">{income.amount}</span>
                                <span className="income-category">{income.category}</span>
                                <span className="income-date">{income.date}</span>
                                <button className="delete-btn">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default IncomesList;