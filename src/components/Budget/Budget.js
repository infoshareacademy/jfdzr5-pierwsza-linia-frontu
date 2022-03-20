import BudgetFormExpenses from "./BudgetComponents/BudgetFormExpenses";
import BudgetFormIncomes from "./BudgetComponents/BudgetFormIncomes";
import ExpensesList from "./BudgetComponents/ExpensesList";
import IncomesList from "./BudgetComponents/IncomesList";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { firestore } from "../../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { UserContext } from "../../userContext/UserContext";
import { Theme } from "../../common/theme/theme";
import { useMediaQuery } from "@mui/material";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Budget = () => {
  const theme = useTheme();
  const expensesColRef = collection(firestore, "budget-expenses");
  const incomesColRef = collection(firestore, "budget-incomes");

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [chosenMoneyOperations, setChosenMoneyOperations] =
    useState("expenses");
  const [expensesFilterValue, setExpensesFilterValue] = useState("Wszystko");
  const [incomesFilterValue, setIncomesFilterValue] = useState("Wszystko");
  const [uid, setUid] = useState("");
  const { userUID } = useContext(UserContext);

  const maxWidth1000 = useMediaQuery(
    `(max-width: ${Theme.breakpoints.maxWidth1000})`
  );

  const widthEditInput = "90px";
  useEffect(() => {
    if (userUID) {
      setUid(userUID);
    }
  }, [userUID]);

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

  const handleExpenseSubmit = expense => {
    addDoc(expensesColRef, expense);
  };

  const handleIncomesSubmit = income => {
    addDoc(incomesColRef, income);
  };

  const handleExpensesFilter = event =>
    setExpensesFilterValue(event.target.value);

  const filterExpenses = expenses.filter(element => {
    if (element.uid === uid) {
      return (
        expensesFilterValue === "Wszystko" ||
        element.category === expensesFilterValue
      );
    }
  });

  const handleIncomesFilter = event =>
    setIncomesFilterValue(event.target.value);

  const filterIncomes = incomes.filter(element => {
    if (element.uid === uid) {
      return (
        incomesFilterValue === "Wszystko" ||
        element.category === incomesFilterValue
      );
    }
  });

  const handleExpensesDelete = id => {
    deleteDoc(doc(firestore, "budget-expenses", id));
  };

  const handleIncomesDelete = id => {
    deleteDoc(doc(firestore, "budget-incomes", id));
  };

  const expensesSum = filterExpenses.reduce(function (prev, curr) {
    return prev + curr.amount;
  }, 0);

  const incomesSum = filterIncomes.reduce(function (prev, curr) {
    return prev + curr.amount;
  }, 0);

  return (
    <PageWrapper>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: "40px" }}>
        Budżet domowy
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: maxWidth1000 ? "column" : "row",
          width: maxWidth1000 || "100%",
          maxWidth: "1600px",
          justifyContent: "center",
          gap: "20px",
          backgroundColor: Theme.palette.secondary.main,
          padding: "30px",
          margin: "20px",
          boxSizing: "border-box",
        }}>
        <div
          style={{
            alignSelf: maxWidth1000 ? "center" : "flex-start",
            width: maxWidth1000 ? "inherit" : "15%",
            flexGrow: "1.5",
            marginTop: "17px",
            margin: "0px",
          }}>
          {chosenMoneyOperations === "expenses" ? (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Suma wydatków
            </Typography>
          ) : (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Suma przychodów
            </Typography>
          )}
          <Box
            sx={{
              fontSize: "30px",
              padding: "1.5rem",
              alignSelf: "center",
              backgroundColor: Theme.palette.backgroundColor.main,
              textAlign: "center",
            }}>
            {chosenMoneyOperations === "expenses"
              ? `${parseFloat(expensesSum).toFixed(2)} zł`
              : `${parseFloat(incomesSum).toFixed(2)} zł`}
          </Box>
        </div>
        <div style={{ flexGrow: "2" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                margin: "1rem",
                height: "3rem",
                width: "8rem",
                backgroundColor:
                  chosenMoneyOperations === "expenses"
                    ? theme.palette.primary.contrastText
                    : "white",
                ":hover": {
                  backgroundColor: theme.palette.primary.contrastText,
                },
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
                backgroundColor:
                  chosenMoneyOperations === "incomes"
                    ? theme.palette.primary.contrastText
                    : "white",
                ":hover": {
                  backgroundColor: theme.palette.primary.contrastText,
                },
              }}
              onClick={() => setChosenMoneyOperations("incomes")}>
              Przychody
            </Button>
          </div>
          {chosenMoneyOperations === "expenses" ? (
            <BudgetFormExpenses uid={uid} onSubmit={handleExpenseSubmit} />
          ) : (
            <BudgetFormIncomes uid={uid} onSubmit={handleIncomesSubmit} />
          )}
        </div>

        {chosenMoneyOperations === "expenses" ? (
          <div
            style={{
              flexGrow: "3",
              width: maxWidth1000 ? "inherit" : "700px",
            }}>
            <ListContainer style={{ marginTop: "0" }}>
              <h3>Pokaż wydatki z kategorii: </h3>
              <Select
                id="Category"
                value={expensesFilterValue}
                onChange={handleExpensesFilter}
                sx={{
                  height: "3rem",
                  width: "10rem",
                  backgroundColor: theme.palette.secondary.contrastText,
                  ":hover": {
                    backgroundColor: theme.palette.primary.contrastText,
                  },
                }}>
                <MenuItem value="Wszystko">Wszystko</MenuItem>
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
            </ListContainer>
            <ExpensesList
              uid={uid}
              expenses={filterExpenses}
              onDelete={handleExpensesDelete}
              firestore={firestore}
              widthEditInput={widthEditInput}
            />
          </div>
        ) : (
          <div
            style={{
              flexGrow: "3",
              width: maxWidth1000 ? "inherit" : "700px",
            }}>
            <ListContainer style={{ marginTop: "0" }}>
              <h3>Pokaż przychody z kategorii: </h3>

              <Select
                id="Category"
                value={incomesFilterValue}
                onChange={handleIncomesFilter}
                sx={{
                  height: "3rem",
                  width: "10rem",
                  backgroundColor: theme.palette.secondary.contrastText,
                  ":hover": {
                    backgroundColor: theme.palette.primary.contrastText,
                  },
                }}>
                <MenuItem value="Wszystko">Wszystko</MenuItem>
                <MenuItem value="Wynagrodzenie">Wynagrodzenie</MenuItem>
                <MenuItem value="Inne">Inne</MenuItem>
              </Select>
            </ListContainer>
            <IncomesList
              uid={uid}
              incomes={filterIncomes}
              onDelete={handleIncomesDelete}
              firestore={firestore}
            />
          </div>
        )}
      </Box>
    </PageWrapper>
  );
};
