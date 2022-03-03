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

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Budget = props => {
  const theme = useTheme();
  const expensesColRef = collection(firestore, "budget-expenses");
  const incomesColRef = collection(firestore, "budget-incomes");

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [chosenMoneyOperations, setChosenMoneyOperations] =
    useState("expenses");
  const [expensesFilterValue, setExpensesFilterValue] = useState("Wszystko");
  const [incomesFilterValue, setIncomesFilterValue] = useState("Wszystko");
  //tu sa zmienne do ktorych przypisuje uid
  //oraz jest tu userUID to jest tez zmienna a konkretnie to jest obiekt uzytkownika w który jest własnie uid
  // uid to jest indywidualny id kazdego uzytkownika, towrzy sie przy zalozeniu konta
  // dlatego wykorzystuje to uid we wszystkich naszych komponentach
  //bo dzieki temu mozna wszystko powiazac z danym uzytkownikiem
  const [uid, setUid] = useState("");
  const { userUID } = useContext(UserContext);
  //tu jest pobieray z useContext wlasnie ten obiekt uzytkownika
  useEffect(() => {
    if (userUID) {
      setUid(userUID);
    }
  });

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

  //zmodyfikowalem ta funkcje zeby filtrowala wszystkie przychody/wydatki
  //po uid uzytkownika
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

  //zmodyfikowalem ta funkcje zeby filtrowala wszystkie przychody/wydatki
  //po uid uzytkownika
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

  //tu dopisalem Ci funkcje ktora liczy rownie przychody
  //bo chcialem sprwdzic czy to zadziala :)
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
          flexDirection: "row",
          width: "100%",
          maxWidth: "1600px",
          justifyContent: "space-between",
          gap: "10px",
        }}>
        <div
          style={{
            alignSelf: "flex-start",
            width: "8rem",
            flexGrow: "1.5",
            marginTop: "17px",
          }}>
          {chosenMoneyOperations === "expenses" ? (
            <h3 style={{ textAlign: "center" }}>Suma wydatków</h3>
          ) : (
            <h3 style={{ textAlign: "center" }}>Suma przychodów</h3>
          )}
          <Box
            sx={{
              fontSize: "30px",
              padding: "1.5rem",
              alignSelf: "center",
              backgroundColor: theme.palette.secondary.main,
              textAlign: "center",
            }}>
            {/* tu również mój kod :) dopisałem warunek ktory sprawdza czy sa wlaczone wydatki
                czy przychody i wyswietla to lub to */}
            {chosenMoneyOperations === "expenses"
              ? `${expensesSum} zł`
              : `${incomesSum} zł`}
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
            // tu przekazuje uid w propsach
            <BudgetFormExpenses uid={uid} onSubmit={handleExpenseSubmit} />
          ) : (
            // tu przekazuje uid w propsach
            <BudgetFormIncomes uid={uid} onSubmit={handleIncomesSubmit} />
          )}
        </div>

        {chosenMoneyOperations === "expenses" ? (
          <div
            style={{
              flexGrow: "1",
              width: "50%",
              alignSelf: "flex-start",
            }}>
            <ListContainer style={{ marginTop: "0" }}>
              <h3>Pokaż wydatki z kategorii: </h3>
              <Select
                id="Category"
                value={expensesFilterValue}
                onChange={handleExpensesFilter}
                sx={{
                  height: "3rem",
                  width: "15rem",
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
              // tu przekazuje uid w propsach
              uid={uid}
              expenses={filterExpenses}
              onDelete={handleExpensesDelete}
              firestore={firestore}
            />
          </div>
        ) : (
          <div
            style={{
              flexGrow: "1",
              width: "50%",
              alignSelf: "flex-start",
            }}>
            <ListContainer style={{ marginTop: "0" }}>
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
              // tu przekazuje uid w propsach
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
