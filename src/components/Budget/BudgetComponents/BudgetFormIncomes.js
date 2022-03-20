import React, { useState } from "react";
import { Theme } from "../../../common/theme/theme";
import { FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddInput } from "./AddInput";
import { SelectComponent } from "./SelectComponent";
import { EditInput } from "./EditInput";

function BudgetFormIncomes({ uid, onSubmit }) {
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const handleAmountChange = event => {
    setAmountInput(event.target.value.replace(",", "."));
  };
  const handleCategoryChange = event => setCategoryInput(event.target.value);
  const handleDateChange = event => setDateInput(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit({
      amount: parseFloat(amountInput),
      category: categoryInput,
      date: dateInput,
      uid: uid,
    });
    setAmountInput("");
    setCategoryInput("");
    setDateInput("");
  };
  return (
    <>
      <Box
        sx={{
          padding: "3rem",
          backgroundColor: Theme.palette.backgroundColor.main,
        }}>
        <form className="budget-form" onSubmit={handleSubmit}>
          <AddInput value={amountInput} onChange={handleAmountChange} />
          <FormHelperText
            sx={{
              margin: ".25rem",
              height: "1rem",
              color: Theme.palette.secondary.contrastText,
            }}>
            Kwota{" "}
          </FormHelperText>
          <SelectComponent
            handleCategoryChange={handleCategoryChange}
            categoryInput={categoryInput}
            width="100%">
            <MenuItem value="Wynagrodzenie">Wynagrodzenie</MenuItem>
            <MenuItem value="Inne">Inne</MenuItem>
          </SelectComponent>
          <FormHelperText
            sx={{
              margin: ".25rem",
              height: "1rem",
              color: Theme.palette.secondary.contrastText,
            }}>
            Kategoria{" "}
          </FormHelperText>

          <EditInput
            value={dateInput}
            onChange={handleDateChange}
            type="date"
            width="100%"
          />
          <FormHelperText
            sx={{
              margin: ".25rem",
              height: "1rem",
              color: Theme.palette.secondary.contrastText,
            }}>
            Data{" "}
          </FormHelperText>

          <Button
            type="submit"
            variant="outlined"
            sx={{
              marginTop: "2rem",
              width: "100%",
              height: "3rem",
              color: Theme.palette.primary,
              backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": { backgroundColor: Theme.palette.primary.contrastText },
            }}>
            <AddIcon></AddIcon>
          </Button>
        </form>
      </Box>
    </>
  );
}

export default BudgetFormIncomes;
