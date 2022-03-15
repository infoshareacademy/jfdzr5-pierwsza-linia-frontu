import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Icon } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DeleteDialog } from "./DeleteDialog";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/pl";
dayjs.locale("pl");

const NewIncomeContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin-left: 100px;
  margin-top: 10px;
  padding: 10px;
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

function IncomesList(props) {
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deletedTaskId, setDeletedTaskId] = useState(null);

  const handleEditIncome = id => {
    setEditedTaskId(id);
    const editedTask = props.incomes.find(income => income.id === id);
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

    const docRefIncomes = doc(props.firestore, "budget-incomes", id);
    await updateDoc(docRefIncomes, {
      amount: parseFloat(amountInput),
      category: categoryInput,
      date: dateInput,
      uid: props.uid,
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
    props.onDelete(deletedTaskId);
    setIsOpen(false);
    setDeletedTaskId(null);
  };

  const handleOpenDialog = id => {
    setDeletedTaskId(id);
    setIsOpen(true);
  };

  return (
    <Box>
      <div className="income-container">
        <List>
          {props.incomes.map(
            income =>
              income.uid === props.uid && (
                <>
                  <NewIncomeContainer>
                    <ListItem className="incomes" key={income.id}>
                      {income.id === editedTaskId ? (
                        <>
                          <OutlinedInput
                            inputProps={{
                              pattern: "[0-9]+(.|,)[0-9]{0,2}",
                              title:
                                "podaj liczbę z maks. 2 cyframi po przecinku ",
                            }}
                            required
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
                            <MenuItem value="Wynagrodzenie">
                              Wynagrodzenie
                            </MenuItem>
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
                            <Icon onClick={() => handleClickSave(income.id)}>
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
                            {parseFloat(income.amount).toFixed(2)} zł
                          </ListItemElement>
                          <ListItemElement>{income.category}</ListItemElement>
                          <ListItemElement>
                            {dayjs(income.date).format("D MMMM")}
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
                              onClick={() => handleOpenDialog(income.id)}
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
                              style={{ width: "4rem" }}
                              onClick={() => handleEditIncome(income.id)}
                            />
                          </Button>
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
