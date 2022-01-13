import './App.css';
import './components/Budget/Budget.css'
import MainPage from './components/MainPage/MainPage';
import { BudgetForm } from './components/Budget/BudgetForm';
import { MyButton } from './components/Budget/BudgetHeader';

function App() {
  return (
    <>
      <MainPage />
      <MyButton />
      <BudgetForm />

    </>
  );
}

export default App;
