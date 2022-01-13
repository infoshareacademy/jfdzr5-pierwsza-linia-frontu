import './App.css';
import './components/Budget/Budget.css'
import MainPage from './components/MainPage/MainPage';
import { BudgetForm } from './components/Budget/BudgetForm';
import { ToggleButton } from './components/Budget/BudgetHeader';

function App() {
  return (
    <>
      <MainPage />
      <ToggleButton />
      <BudgetForm />

    </>
  );
}

export default App;
