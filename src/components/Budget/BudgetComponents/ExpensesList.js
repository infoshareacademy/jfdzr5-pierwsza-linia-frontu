import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Container, Input } from '@mui/material';
import { useState } from 'react';

function ExpensesList(props) {
    function handleEdit() {

    }
    function handleRemove(id) {
        props.expenses.filter((item) => item.id !== id);
    }

    return (
        <div className="expenses-container">
            <ul className="expenses-list">
                {
                    props.expenses.map((expense) => {
                        return <Container>
                            (
                            <li className="expenses" key={expense.id}>
                                <span className="expenses-amount">{expense.amount} zł</span>
                                <span className="expenses-category">{expense.category} </span>
                                <span className="expenses-date">{expense.date}</span>
                                <EditIcon onClick={() => handleEdit(expense.id)} />
                                <DeleteIcon onClick={() => handleRemove(expense.id)} />
                            </li>

                            )
                        </Container>
                    })
                }

            </ul>
        </div >
    )
}


export default ExpensesList;