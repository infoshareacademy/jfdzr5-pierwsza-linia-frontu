import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const NewExpenseContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin: 10px;
  padding: 10px;
  background-color: ${Theme.palette.secondary.main};
  color: ${Theme.palette.secondary.contrastText};
`;

const ListItemElement = styled.span`
  padding: 10px;
`;

function ExpensesList(props) {
  return (
    <div className="expenses-container">
      <List>
        {props.expenses.map(
          expense =>
            // return  jest niepotrzebny więc go usunąłem
            //tutaj sprawdzam czy uid pobrane i przypisane do danego wydatku jest rowne uid danego uzytkownika
            expense.uid === props.uid && (
              <>
                <NewExpenseContainer>
                  <ListItem className="expenses" key={expense.id}>
                    <ListItemElement style={{ width: "9rem" }}>
                      {expense.amount} zł{" "}
                    </ListItemElement>
                    <ListItemElement style={{ width: "9rem" }}>
                      {expense.category}
                    </ListItemElement>
                    <ListItemElement style={{ width: "7rem" }}>
                      {expense.date}
                    </ListItemElement>

                    <DeleteIcon onClick={() => props.onDelete(expense.id)} />
                  </ListItem>
                </NewExpenseContainer>
              </>
            )
        )}
      </List>
    </div>
  );
}

export default ExpensesList;
