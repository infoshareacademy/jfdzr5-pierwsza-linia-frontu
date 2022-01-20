import React, { useState } from "react";

function IncomeList() {
    return (
        <div className="income-container">
            <ul className="income-list">
                <li className="incomes">
                    <span className="income-amount">500zł</span>
                    <span className="income-category">jedzenie</span>
                    <span className="income-date">10.10.2022</span>
                    <button className="delete-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default IncomeList;