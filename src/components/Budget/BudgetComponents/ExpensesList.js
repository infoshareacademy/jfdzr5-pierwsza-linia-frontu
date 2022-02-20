import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Icon } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


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
  width: 7rem;
`;

function ExpensesList(props) {
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const handleEditTask = (id) => {
    setEditedTaskId(id)
    const editedTask = props.expenses.find((expense) => expense.id === id)
    setAmountInput(editedTask.amount)
    setCategoryInput(editedTask.category)
    setDateInput(editedTask.date)

  }
  const handleAmountChange = event => {
    setAmountInput(event.target.value.replace(",", "."));
  };
  const handleCategoryChange = event => setCategoryInput(event.target.value);
  const handleDateChange = event => setDateInput(event.target.value);

  // const handleClickSave = async (id) => {
  //   setEditedTaskId(false);
  // }

  const handleClickCancel = (id) => {
    setEditedTaskId(id);
  };

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
                    {
                      expense.id === editedTaskId ? (<>
                        <OutlinedInput
                          required
                          inputProps={{
                            pattern: "[0-9]+(.|,)[0-9]{0,2}",
                            title: "podaj liczbę z maks. 2 cyframi po przecinku ",
                          }}
                          placeholder="Podaj kwotę..."
                          value={amountInput}
                          onChange={handleAmountChange}
                          sx={{
                            width: "100%",
                            height: "3rem",
                            backgroundColor: Theme.palette.secondary.contrastText,
                            ":hover": { backgroundColor: Theme.palette.primary.contrastText },
                          }}></OutlinedInput>
                        <FormHelperText
                          sx={{
                            margin: ".25rem",
                            height: "1rem",
                            color: Theme.palette.secondary.contrastText,
                          }}>
                          Kwota{" "}
                        </FormHelperText>

                        <Select
                          required
                          id="Category"
                          value={categoryInput}
                          onChange={handleCategoryChange}
                          sx={{
                            height: "3rem",
                            width: "15rem",
                            backgroundColor: Theme.palette.secondary.contrastText,
                            ":hover": { backgroundColor: Theme.palette.primary.contrastText },
                          }}>
                          <MenuItem value="Jedzenie/Picie">Jedzenie/Napoje</MenuItem>
                          <MenuItem value="Rachunki">Rachunki</MenuItem>
                          <MenuItem value="Rozrywka">Rozrywka</MenuItem>
                          <MenuItem value="Zakupy">Zakupy</MenuItem>
                          <MenuItem value="Transport">Transport</MenuItem>
                          <MenuItem value="Rodzina">Rodzina</MenuItem>
                          <MenuItem value="Zwierzęta">Zwierzęta</MenuItem>
                          <MenuItem value="Podróże">Podróże</MenuItem>
                          <MenuItem value="Inne">Inne</MenuItem>
                        </Select>
                        <FormHelperText
                          sx={{
                            margin: ".25rem",
                            height: "1rem",
                            color: Theme.palette.secondary.contrastText,
                          }}>
                          Kategoria{" "}
                        </FormHelperText>

                        <OutlinedInput
                          required
                          type="date"
                          value={dateInput}
                          onChange={handleDateChange}
                          sx={{
                            width: "100%",
                            height: "3rem",
                            backgroundColor: Theme.palette.secondary.contrastText,
                            ":hover": { backgroundColor: Theme.palette.primary.contrastText },
                          }}
                        />
                        <FormHelperText
                          sx={{
                            margin: ".25rem",
                            height: "1rem",
                            color: Theme.palette.secondary.contrastText,
                          }}>
                          Data{" "}
                        </FormHelperText>

                        <Button>
                          <Icon style={{ color: "white" }}>save</Icon>
                        </Button>
                        <Button>
                          <Icon style={{ color: "white" }} onClick={() => handleClickCancel()}>cancel</Icon>
                        </Button>


                      </>) : (
                        <>
                          <ListItemElement>
                            {expense.amount} zł{" "}
                          </ListItemElement>
                          <ListItemElement>
                            {expense.category}
                          </ListItemElement>
                          <ListItemElement>
                            {expense.date}
                          </ListItemElement>

                          <Button>
                            <DeleteIcon style={{ width: "4rem", color: "white" }} onClick={() => props.onDelete(expense.id)} />
                          </Button>
                          <Button>
                            <EditIcon style={{ width: "4rem", color: "white" }} onClick={() => handleEditTask(expense.id)} />
                          </Button>
                        </>
                      )

                    }


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
