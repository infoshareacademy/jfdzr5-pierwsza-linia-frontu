import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import styled from 'styled-components';
import { Theme } from "../../../common/theme/theme";
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const NewExpenseContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin: 10px;
  padding: 10px;
  background-color: grey;
  color: ${Theme.palette.secondary.contrastText};
  `;

function ExpensesList(props) {


    function handleEdit() {

    }
    function handleRemove(id) {
        props.expenses.filter((item) => item.id !== id);
    }

    return (
        <div className="expenses-container">
            <ul className="expenses-list">
                <NewExpenseContainer >
                    <List>
                        {
                            props.expenses.map((expense) => {
                                return <Container>
                                    (
                                    <ListItem className="expenses" key={expense.id}>
                                        <span className="expenses-amount">{expense.amount} zł    </span>
                                        <span className="expenses-category">{expense.category}     </span>
                                        <span className="expenses-date">{expense.date}</span>
                                        <EditIcon onClick={() => handleEdit(expense.id)} />
                                        <DeleteIcon onClick={() => handleRemove(expense.id)} />
                                    </ListItem>

                                    )
                                </Container>
                            })
                        }
                    </List>
                </NewExpenseContainer>

            </ul>
        </div >
    )
}


export default ExpensesList;