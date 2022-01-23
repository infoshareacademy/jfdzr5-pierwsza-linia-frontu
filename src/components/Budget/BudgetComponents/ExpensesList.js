import React from "react";

function ExpensesList(props) {
    console.log(props)
    return (
        <div className="expenses-container">
            <ul className="expenses-list">
                {
                    props.expenses.map((expense) => {
                        return (
                            <li className="expenses" key={expense.id}>
                                <span className="expenses-amount">{expense.amount}</span>
                                <span className="expenses-category">{expense.category}</span>
                                <span className="expenses-date">{expense.date}</span>
                                <button className="delete-btn">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </li>
                        )
                    })
                }

            </ul>
        </div >
    )

}

export default ExpensesList;