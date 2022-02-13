import BudgetFormExpenses from "./BudgetComponents/BudgetFormExpenses";
import BudgetFormIncomes from "./BudgetComponents/BudgetFormIncomes";
import ExpensesList from "./BudgetComponents/ExpensesList";
import IncomesList from "./BudgetComponents/IncomesList";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";
import { Button } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "styled-components";
import { firestore } from "../../firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';


const ListContainer = styled.div`
margin-top: 60px;
display: flex;
flex-direction: column;
align-items: center;
`


export const Budget = () => {
    const theme = useTheme();
    const expensesColRef = collection(firestore, "budget-expenses");
    const incomesColRef = collection(firestore, "budget-incomes");

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [chosenMoneyOperations, setChosenMoneyOperations] = useState("expenses")
    const [expensesFilterValue, setExpensesFilterValue] = useState("Wszystko")
    const [incomesFilterValue, setIncomesFilterValue] = useState("Wszystko")


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        onSnapshot(expensesColRef, doc => {
            let data = [];
            doc.docs.forEach(element => {
                data.push({ ...element.data(), id: element.id });
            });
            setExpenses(data);
        });
        onSnapshot(incomesColRef, doc => {
            let data = [];
            doc.docs.forEach(element => {
                data.push({ ...element.data(), id: element.id });
            });
            setIncomes(data);
        });
    };

    const handleExpenseSubmit = (expense) => {
        addDoc(expensesColRef, expense);
    }

    const handleIncomesSubmit = (income) => {
        addDoc(incomesColRef, income);

    }

    const handleExpensesFilter = (event) => setExpensesFilterValue(event.target.value);

    const filterExpenses = expenses.filter(element => {

        return expensesFilterValue === "Wszystko" || element.category === expensesFilterValue
    })


    const handleIncomesFilter = (event) => setIncomesFilterValue(event.target.value);

    const filterIncomes = incomes.filter(element => {

        return incomesFilterValue === "Wszystko" || element.category === incomesFilterValue
    })



    const handleExpensesDelete = (id) => {
        deleteDoc(doc(firestore, "budget-expenses", id));

    }

    const handleIncomesDelete = (id) => {
        deleteDoc(doc(firestore, "budget-incomes", id));

    }

    const expensesSum = filterExpenses.reduce(function (prev, curr) {
        return prev + curr.amount
    }, 0);

    return (
        <PageWrapper>


            <Typography variant="h3" sx={{ textAlign: "center", marginBottom: "40px" }}>Budżet domowy</Typography>
            <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", width: "100%", maxWidth: "1600px" }}>
                <div style={{ marginTop: "70px" }}>
                    <h3>Suma wydatków</h3>
                    <Box sx={{ fontSize: "30px", marginTop: "100px", marginRight: "10px", padding: "3rem", backgroundColor: theme.palette.secondary.main }}>
                        {expensesSum} zł
                    </Box>
                </div>
                <div>
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
                    {chosenMoneyOperations === "expenses" ?
                        <BudgetFormExpenses onSubmit={handleExpenseSubmit} /> :
                        <BudgetFormIncomes onSubmit={handleIncomesSubmit} />
                    }
                </div>

                {
                    chosenMoneyOperations === "expenses" ? (
                        <div>

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
                        </div>
                    ) : (
                        <div>
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

                        </div>
                    )
                }
            </Box>


        </PageWrapper >
    )
}