import './App.css';
import './components/Budget/Budget.css'
import MainPage from './components/MainPage/MainPage';
import BudgetFormExpenses from './components/Budget/BudgetFormExpenses';
import { MyButton } from './components/Budget/BudgetHeader';
import ExpensesList from './components/Budget/ExpensesList';
import IncomeList from './components/Budget/IncomeList';
import { useState } from 'react';


function App() {
  const [expenses, setExpenses] = useState([

  ]);
  const handleSubmit = (expense) => {
    console.log(expense)
    setExpenses([...expenses, expense])
  }
  return (
    <>
      {/* <MainPage /> */}
      <MyButton />
      <BudgetFormExpenses onSubmit={handleSubmit} />
      <ExpensesList expenses={expenses} />
      <IncomeList />

    </>
  );
}

export default App;
