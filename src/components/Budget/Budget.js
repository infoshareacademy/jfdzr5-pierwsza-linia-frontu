import BudgetFormExpenses from "./BudgetComponents/BudgetFormExpenses";
import BudgetFormIncomes from "./BudgetComponents/BudgetFormIncomes";
import ExpensesList from "./BudgetComponents/ExpensesList";
import IncomesList from "./BudgetComponents/IncomesList";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";
import { Button } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "styled-components";

const ListContainer = styled.div`
margin-top: 40px;
`


export const Budget = () => {
    const theme = useTheme();
    console.log(theme)

    const [expenses, setExpenses] = useState([

    ]);
    const handleExpenseSubmit = (expense) => {
        setExpenses([...expenses, expense])
    }

    const [incomes, setIncomes] = useState([

    ]);
    const handleIncomesSubmit = (income) => {
        setIncomes([...incomes, income])
    }

    const [chosenMoneyOperations, setChosenMoneyOperations] = useState(
        "expenses"
    )


    const [expensesFilterValue, setExpensesFilterValue] = useState("Wszystko")

    const handleExpensesFilter = (event) => setExpensesFilterValue(event.target.value);

    const filterExpenses = expenses.filter(element => {

        return expensesFilterValue === "Wszystko" || element.category === expensesFilterValue
    })

    const [incomesFilterValue, setIncomesFilterValue] = useState("Wszystko")

    const handleIncomesFilter = (event) => setIncomesFilterValue(event.target.value);

    const filterIncomes = incomes.filter(element => {

        return incomesFilterValue === "Wszystko" || element.category === incomesFilterValue
    })



    const handleExpensesDelete = (id) => {
        const filtered = expenses.filter((item) => item.id !== id)
        setExpenses(filtered)
    }

    const handleIncomesDelete = (id) => {
        const filtered = incomes.filter((item) => item.id !== id)
        setIncomes(filtered)
    }



    return (
        <PageWrapper>

            <h1>Budżet domowy</h1>
            <div>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        margin: "1rem",
                        height: "3rem",
                        width: "8rem",
                        backgroundColor: chosenMoneyOperations === 'expenses' ? theme.palette.primary.contrastText : 'white',
                        ":hover": { backgroundColor: theme.palette.primary.contrastText }

                    }}
                    onClick={() => setChosenMoneyOperations("expenses")}>
                    Wydatki
                </Button>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        margin: "1rem",
                        height: "3rem",
                        width: "8rem",
                        color: theme.palette.primary,
                        backgroundColor: chosenMoneyOperations === 'incomes' ? theme.palette.primary.contrastText : 'white',
                        ":hover": { backgroundColor: theme.palette.primary.contrastText },
                    }}
                    onClick={() => setChosenMoneyOperations("incomes")}>
                    Przychody
                </Button>
            </div>
            {
                chosenMoneyOperations === "expenses" ? (
                    <>
                        <BudgetFormExpenses onSubmit={handleExpenseSubmit} />
                        <ListContainer>
                            <h3>Pokaż wydatki z kategorii: </h3>
                            <Select
                                id="Category"
                                value={expensesFilterValue}
                                onChange={handleExpensesFilter}
                                sx={{
                                    height: "3rem",
                                    width: "15rem",
                                    backgroundColor: theme.palette.secondary.contrastText,
                                    ":hover": { backgroundColor: theme.palette.primary.contrastText }
                                }}
                            >
                                <MenuItem value="Wszystko">Wszystko</MenuItem>
                                <MenuItem value='Jedzenie/Picie'>Jedzenie/Napoje</MenuItem>
                                <MenuItem value='Rachunki'>Rachunki</MenuItem>
                                <MenuItem value='Rozrywka'>Rozrywka</MenuItem>
                                <MenuItem value='Zakupy'>Zakupy</MenuItem>
                                <MenuItem value='Transport'>Transport</MenuItem>
                                <MenuItem value='Rodzina'>Rodzina</MenuItem>
                                <MenuItem value='Zwierzęta'>Zwierzęta</MenuItem>
                                <MenuItem value='Podróże'>Podróże</MenuItem>
                                <MenuItem value='Inne'>Inne</MenuItem>

                            </Select>
                        </ListContainer>
                        <ExpensesList expenses={filterExpenses} onDelete={handleExpensesDelete} />
                    </>
                ) : (
                    <>
                        <BudgetFormIncomes onSubmit={handleIncomesSubmit} />
                        <ListContainer>
                            <h3>Pokaż przychody z kategorii: </h3>

                            <Select
                                id="Category"
                                value={incomesFilterValue}
                                onChange={handleIncomesFilter}
                                label="Category"
                                sx={{
                                    height: "3rem",
                                    width: "15rem",
                                    backgroundColor: theme.palette.secondary.contrastText,
                                    ":hover": { backgroundColor: theme.palette.primary.contrastText }
                                }}
                            >
                                <MenuItem value="Wszystko">Wszystko</MenuItem>
                                <MenuItem value='Wynagrodzenie'>Wynagrodzenie</MenuItem>
                                <MenuItem value='Inne'>Inne</MenuItem>

                            </Select>
                        </ListContainer>
                        <IncomesList incomes={filterIncomes} onDelete={handleIncomesDelete} />

                    </>
                )
            }



        </PageWrapper >
    )
}