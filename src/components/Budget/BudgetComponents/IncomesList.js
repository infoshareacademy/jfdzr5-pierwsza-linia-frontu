import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
                                <EditIcon />
                                <DeleteIcon />
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default IncomesList;