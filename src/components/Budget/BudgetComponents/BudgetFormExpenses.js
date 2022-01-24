import React, { useState } from 'react';
import { OutlinedInput } from "@mui/material";
import { Theme } from '../../../common/theme/theme';
import { FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import Select from '@mui/material/Select';
import { Box } from "@mui/material";



function BudgetFormExpenses(props) {
    const [amountInput, setAmountInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('Jedzenie/Napoje');
    const [dateInput, setDateInput] = useState('');
    const handleAmountChange = (event) => setAmountInput(event.target.value);
    const handleCategoryChange = (event) => setCategoryInput(event.target.value);
    const handleDateChange = (event) => setDateInput(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            amount: parseInt(amountInput),
            category: categoryInput,
            date: dateInput,
        })

    }
    return <>
        <Box sx={{ padding: "1rem", backgroundColor: Theme.palette.secondary.main }}
        >
            <form className='budget-form' onSubmit={handleSubmit}>
                <OutlinedInput
                    type="number"
                    placeholder='Podaj kwotę...'
                    value={amountInput}
                    onChange={handleAmountChange}
                    sx={{
                        height: "3rem",
                        backgroundColor: Theme.palette.secondary.contrastText,
                        ":hover": { backgroundColor: Theme.palette.primary.contrastText }
                    }}></OutlinedInput>
                <FormHelperText sx={{ margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText }}>Kwota </FormHelperText>

                <Select
                    id="Category"
                    value={categoryInput}
                    onChange={handleCategoryChange}
                    sx={{
                        height: "3rem",
                        width: "15rem",
                        backgroundColor: Theme.palette.secondary.contrastText,
                        ":hover": { backgroundColor: Theme.palette.primary.contrastText }
                    }}
                >

                    <MenuItem>Jedzenie/Napoje</MenuItem>
                    <MenuItem>Rachunki</MenuItem>
                    <MenuItem>Rozrywka</MenuItem>
                    <MenuItem>Zakupy</MenuItem>
                    <MenuItem>Transport</MenuItem>
                    <MenuItem>Rodzina</MenuItem>
                    <MenuItem>Zwierzęta</MenuItem>
                    <MenuItem>Podróże</MenuItem>
                    <MenuItem>Inne</MenuItem>

                </Select>
                <FormHelperText sx={{ margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText }}>Kategoria </FormHelperText>


                <OutlinedInput
                    type='date'
                    value={dateInput}
                    onChange={handleDateChange}
                    sx={{
                        height: "3rem",
                        backgroundColor: Theme.palette.secondary.contrastText,
                        ":hover": { backgroundColor: Theme.palette.primary.contrastText }
                    }}
                />
                <FormHelperText sx={{ margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText }}>Data </FormHelperText>



                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        margin: "1rem",
                        height: "3rem",
                        color: Theme.palette.primary,
                        backgroundColor: Theme.palette.secondary.contrastText,
                        ":hover": { backgroundColor: Theme.palette.primary.contrastText },
                    }}>Dodaj</Button>



            </form>
        </Box>

    </>
}

export default BudgetFormExpenses;