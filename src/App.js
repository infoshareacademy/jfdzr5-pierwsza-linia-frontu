import './App.css';
import './components/Budget/Budget.css'
import MainPage from './components/MainPage/MainPage';
import BudgetFormExpenses from './components/Budget/BudgetFormExpenses';
import { MyButton } from './components/Budget/BudgetHeader';
import ExpensesList from './components/Budget/ExpensesList';
import IncomeList from './components/Budget/IncomeList';
import { useState } from 'react';
import BudgetFormIncomes from './components/Budget/BudgetFormIncomes';


function App() {
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
  return (
    <>
      {/* <MainPage /> */}
      <MyButton />
      <BudgetFormExpenses onSubmit={handleExpenseSubmit} />
      <BudgetFormIncomes onSubmit={handleIncomesSubmit} />
      <ExpensesList expenses={expenses} />
      <IncomeList incomes={incomes} />

    </>
  );
}

export default App;
