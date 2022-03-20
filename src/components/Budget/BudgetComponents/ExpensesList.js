import React, { useState } from "react";

import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DeleteDialog } from "./DeleteDialog";
import { doc, updateDoc } from "firebase/firestore";
import { DeleteButton } from "../../../common/buttons/DeleteButton";
import { CancelButton } from "../../../common/buttons/CancelButton";

import dayjs from "dayjs";
import "dayjs/locale/pl";
import { EditButton } from "../../../common/buttons/EditButton";
import { SaveButton } from "../../../common/buttons/SaveButton";
import { SelectComponent } from "./SelectComponent";
import { EditInput } from "./EditInput";
dayjs.locale("pl");

const NewExpenseContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin-top: 10px;
  padding: 10px;
  flex-wrap: wrap;
  background-color: ${Theme.palette.backgroundColor.main};
  color: ${Theme.palette.secondary.contrastText};
`;

const ListItemElement = styled.span`
  padding: 10px;
  width: 7rem;
`;
const ListItemContainer = styled.div`
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
`;

function ExpensesList({ uid, expenses, onDelete, firestore, widthEditInput }) {
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deletedTaskId, setDeletedTaskId] = useState(null);

  const handleClickEdit = id => {
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

  const handleClickOpen = id => {
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
                        <ListItemContainer>
                          <EditInput
                            onChange={handleAmountChange}
                            value={amountInput}
                            type="number"
                            width={widthEditInput}
                          />
                          <SelectComponent
                            handleCategoryChange={handleCategoryChange}
                            categoryInput={categoryInput}
                            width="130px">
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
                          </SelectComponent>
                          <EditInput
                            onChange={handleDateChange}
                            value={dateInput}
                            type="date"
                            width="170px"
                          />
                          <SaveButton
                            handleClickSave={handleClickSave}
                            id={expense.id}
                          />
                          <CancelButton handleClickCancel={handleClickCancel} />
                        </ListItemContainer>
                      ) : (
                        <ListItemContainer>
                          <ListItemElement>
                            {parseFloat(expense.amount).toFixed(2)} zł{" "}
                          </ListItemElement>
                          <ListItemElement>{expense.category}</ListItemElement>
                          <ListItemElement>
                            {dayjs(expense.date).format("D MMMM")}
                          </ListItemElement>

                          <DeleteButton
                            handleClickOpen={handleClickOpen}
                            id={expense.id}
                          />
                          <EditButton
                            handleClickEdit={handleClickEdit}
                            id={expense.id}
                          />
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
