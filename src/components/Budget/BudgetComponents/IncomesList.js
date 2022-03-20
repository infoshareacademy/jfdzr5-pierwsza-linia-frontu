import React, { useState } from "react";

import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DeleteDialog } from "./DeleteDialog";
import { doc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { DeleteButton } from "../../../common/buttons/DeleteButton";
import { EditButton } from "../../../common/buttons/EditButton";
import { CancelButton } from "../../../common/buttons/CancelButton";
import { SaveButton } from "../../../common/buttons/SaveButton";
import { EditInput } from "./EditInput";
import { SelectComponent } from "./SelectComponent";
dayjs.locale("pl");

const NewIncomeContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin-top: 10px;
  padding: 10px;
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

function IncomesList({ uid, incomes, onDelete, firestore, widthEditInput }) {
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deletedTaskId, setDeletedTaskId] = useState(null);

  const handleClickEdit = id => {
    setEditedTaskId(id);
    const editedTask = incomes.find(income => income.id === id);
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

    const docRefIncomes = doc(firestore, "budget-incomes", id);
    await updateDoc(docRefIncomes, {
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

  const handleDeleteIncome = () => {
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
      <div className="income-container">
        <List>
          {incomes.map(
            income =>
              income.uid === uid && (
                <>
                  <NewIncomeContainer>
                    <ListItem className="incomes" key={income.id}>
                      {income.id === editedTaskId ? (
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
                            <MenuItem value="Wynagrodzenie">
                              Wynagrodzenie
                            </MenuItem>
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
                            id={income.id}
                          />
                          <CancelButton handleClickCancel={handleClickCancel} />
                        </ListItemContainer>
                      ) : (
                        <ListItemContainer>
                          <ListItemElement>
                            {parseFloat(income.amount).toFixed(2)} zł
                          </ListItemElement>
                          <ListItemElement>{income.category}</ListItemElement>
                          <ListItemElement>
                            {dayjs(income.date).format("D MMMM")}
                          </ListItemElement>

                          <DeleteButton
                            handleClickOpen={handleClickOpen}
                            id={income.id}
                          />
                          <EditButton
                            handleClickEdit={handleClickEdit}
                            id={income.id}
                          />
                        </ListItemContainer>
                      )}
                    </ListItem>
                  </NewIncomeContainer>
                </>
              )
          )}
        </List>
      </div>
      <DeleteDialog
        open={isOpen}
        handleClose={handleCloseDialog}
        handleDeleteTask={handleDeleteIncome}
      />
    </Box>
  );
}

export default IncomesList;
