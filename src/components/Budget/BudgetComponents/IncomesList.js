import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";

const NewIncomeContainer = styled.div`
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

function IncomesList(props) {
  return (
    <div className="income-container">
      <List>
        {props.incomes.map(
          income =>
            // return  jest niepotrzebny więc go usunąłem
            //tutaj sprawdzam czy uid pobrane i przypisane do danego wydatku jest rowne uid danego uzytkownika
            income.uid === props.uid && (
              <>
                <NewIncomeContainer>
                  <ListItem className="incomes" key={income.id}>
                    <ListItemElement style={{ width: "7rem" }}>
                      {income.amount} zł
                    </ListItemElement>
                    <ListItemElement style={{ width: "7rem" }}>
                      {income.category}
                    </ListItemElement>
                    <ListItemElement style={{ width: "7rem" }}>
                      {income.date}
                    </ListItemElement>

                    <Button>
                      <DeleteIcon style={{ width: "4rem" }} onClick={() => props.onDelete(income.id)} />
                    </Button>
                    <Button>
                      <EditIcon style={{ width: "4rem" }} onClick={() => (income.id)} />
                    </Button>

                  </ListItem>
                </NewIncomeContainer>
              </>
            )
        )}
      </List>
    </div>
  );
}

export default IncomesList;
