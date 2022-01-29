import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function IncomesList(props) {
    return (
        <div className="income-container">
            <ul className="income-list">
                <List>
                    {
                        props.incomes.map((income) => {
                            return (
                                <ListItem className="incomes" key={income.id}>
                                    <span className="income-amount">{income.amount} zł</span>
                                    <span className="income-category">{income.category}</span>
                                    <span className="income-date">{income.date}</span>
                                    <EditIcon />
                                    <DeleteIcon />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </ul>
        </div>
    )
}

export default IncomesList;