import React, { useState } from "react";
import { OutlinedInput } from "@mui/material";
import { Theme } from "../../../common/theme/theme";
import { FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function BudgetFormExpenses(props) {

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

    props.onSubmit({
      amount: parseFloat(amountInput),
      category: categoryInput,
      date: dateInput,
      uid: props.uid,
    });
    setAmountInput("");
    setCategoryInput("");
    setDateInput("");
  };
  return (
    <>
      <Box
        sx={{ padding: "3rem", backgroundColor: Theme.palette.secondary.main }}>
        <form className="budget-form" onSubmit={handleSubmit}>
          <OutlinedInput
            required
            inputProps={{
              pattern: "[0-9]+(.|,)?[0-9]{0,2}",
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
              margin: "0.25rem",
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
            <MenuItem value="Jedzenie/Napoje">Jedzenie/Napoje</MenuItem>
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

export default BudgetFormExpenses;
