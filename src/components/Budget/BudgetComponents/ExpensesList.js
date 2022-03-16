import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Icon } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DeleteDialog } from "./DeleteDialog";
import { doc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/pl";
dayjs.locale("pl");

const NewExpenseContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin-left: 100px;
  margin-top: 10px;
  padding: 10px;
  flex-wrap: wrap;
  background-color: ${Theme.palette.secondary.main};
  color: ${Theme.palette.secondary.contrastText};
`;

const ListItemElement = styled.span`
  padding: 10px;
  width: 7rem;
`;
const ListItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function ExpensesList({ uid, expenses, onDelete, firestore }) {
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deletedTaskId, setDeletedTaskId] = useState(null);

  const handleEditExpense = id => {
    setEditedTaskId(id);
    const editedTask = expenses.find(expense => expense.id === id);
    setAmountInput(editedTask.amount);
    setCategoryInput(editedTask.category);
    setDateInput(editedTask.date);
  };
  const handleAmountChange = event => {
    setAmountInput(event.target.value.replace(",", "."));
  };
  const handleCategoryChange = event => setCategoryInput(event.target.value);
  const handleDateChange = event => setDateInput(event.target.value);

  const handleClickSave = async id => {
    setEditedTaskId(false);

    const docRefExpenses = doc(firestore, "budget-expenses", id);
    await updateDoc(docRefExpenses, {
      amount: parseFloat(amountInput),
      category: categoryInput,
      date: dateInput,
      uid: uid,
    });
  };

  const handleClickCancel = id => {
    setEditedTaskId(id);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setDeletedTaskId(null);
  };

  const handleDeleteExpense = () => {
    onDelete(deletedTaskId);
    setIsOpen(false);
    setDeletedTaskId(null);
  };

  const handleOpenDialog = id => {
    setDeletedTaskId(id);
    setIsOpen(true);
  };

  return (
    <Box>
      <div className="expenses-container">
        <List>
          {expenses.map(
            expense =>
              expense.uid === uid && (
                <>
                  <NewExpenseContainer>
                    <ListItem className="expenses" key={expense.id}>
                      {expense.id === editedTaskId ? (
                        <>
                          <OutlinedInput
                            required
                            inputProps={{
                              pattern: "[0-9]+(.|,)[0-9]{0,2}",
                              title:
                                "podaj liczbę z maks. 2 cyframi po przecinku ",
                            }}
                            placeholder="Podaj kwotę..."
                            value={amountInput}
                            onChange={handleAmountChange}
                            sx={{
                              width: "100%",
                              height: "3rem",
                              margin: "10px",
                              backgroundColor:
                                Theme.palette.secondary.contrastText,
                              ":hover": {
                                backgroundColor:
                                  Theme.palette.primary.contrastText,
                              },
                            }}></OutlinedInput>

                          <Select
                            required
                            id="Category"
                            value={categoryInput}
                            onChange={handleCategoryChange}
                            sx={{
                              height: "3rem",
                              width: "15rem",
                              margin: "10px",
                              backgroundColor:
                                Theme.palette.secondary.contrastText,
                              ":hover": {
                                backgroundColor:
                                  Theme.palette.primary.contrastText,
                              },
                            }}>
                            <MenuItem value="Jedzenie/Napoje">
                              Jedzenie/Napoje
                            </MenuItem>
                            <MenuItem value="Rachunki">Rachunki</MenuItem>
                            <MenuItem value="Rozrywka">Rozrywka</MenuItem>
                            <MenuItem value="Zakupy">Zakupy</MenuItem>
                            <MenuItem value="Transport">Transport</MenuItem>
                            <MenuItem value="Rodzina">Rodzina</MenuItem>
                            <MenuItem value="Zwierzęta">Zwierzęta</MenuItem>
                            <MenuItem value="Podróże">Podróże</MenuItem>
                            <MenuItem value="Inne">Inne</MenuItem>
                          </Select>

                          <OutlinedInput
                            required
                            type="date"
                            value={dateInput}
                            onChange={handleDateChange}
                            sx={{
                              width: "100%",
                              height: "3rem",
                              margin: "10px",
                              backgroundColor:
                                Theme.palette.secondary.contrastText,
                              ":hover": {
                                backgroundColor:
                                  Theme.palette.primary.contrastText,
                              },
                            }}
                          />

                          <Button
                            sx={{
                              color: Theme.palette.secondary.contrastText,
                              ":hover": {
                                color: Theme.palette.primary.contrastText,
                              },
                            }}>
                            <Icon onClick={() => handleClickSave(expense.id)}>
                              save
                            </Icon>
                          </Button>
                          <Button
                            sx={{
                              color: Theme.palette.secondary.contrastText,
                              ":hover": {
                                color: Theme.palette.primary.contrastText,
                              },
                            }}>
                            <Icon onClick={() => handleClickCancel()}>
                              cancel
                            </Icon>
                          </Button>
                        </>
                      ) : (
                        <ListItemContainer>
                          <ListItemElement>
                            {parseFloat(expense.amount).toFixed(2)} zł{" "}
                          </ListItemElement>
                          <ListItemElement>{expense.category}</ListItemElement>
                          <ListItemElement>
                            {dayjs(expense.date).format("D MMMM")}
                          </ListItemElement>

                          <Button
                            sx={{
                              color: Theme.palette.secondary.contrastText,
                              ":hover": {
                                color: Theme.palette.primary.contrastText,
                              },
                            }}>
                            <DeleteIcon
                              style={{ width: "4rem" }}
                              onClick={() => handleOpenDialog(expense.id)}
                            />
                          </Button>
                          <Button
                            sx={{
                              color: Theme.palette.secondary.contrastText,
                              ":hover": {
                                color: Theme.palette.primary.contrastText,
                              },
                            }}>
                            <EditIcon
                              style={{ width: "4rem", justifySelf: "flex-end" }}
                              onClick={() => handleEditExpense(expense.id)}
                            />
                          </Button>
                        </ListItemContainer>
                      )}
                    </ListItem>
                  </NewExpenseContainer>
                </>
              )
          )}
        </List>
      </div>
      <DeleteDialog
        open={isOpen}
        handleClose={handleCloseDialog}
        handleDeleteTask={handleDeleteExpense}
      />
    </Box>
  );
}

export default ExpensesList;
