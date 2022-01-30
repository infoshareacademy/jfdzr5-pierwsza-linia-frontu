import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { Theme } from "../../../common/theme/theme";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const NewIncomeContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin: 10px;
  padding: 10px;
  background-color: grey;
  color: ${Theme.palette.secondary.contrastText};
  `;

const ListItemElement = styled.span`
padding: 10px;
`



function IncomesList(props) {

    return (
        <div className="income-container">
            <List>
                {
                    props.incomes.map((income) => {
                        return <NewIncomeContainer>

                            <ListItem className="incomes" key={income.id}>
                                <ListItemElement>{income.amount} zł</ListItemElement>
                                <ListItemElement>{income.category}</ListItemElement>
                                <ListItemElement>{income.date}</ListItemElement>

                                <DeleteIcon onClick={() => props.onDelete(income.id)} />
                            </ListItem>

                        </NewIncomeContainer>
                    })
                }
            </List>
        </div>
    )
}

export default IncomesList;