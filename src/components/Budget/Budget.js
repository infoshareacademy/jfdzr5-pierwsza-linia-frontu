import BudgetFormExpenses from "./BudgetFormExpenses";
import BudgetFormIncomes from "./BudgetFormIncomes";
import ExpensesList from "./ExpensesList";
import IncomesList from "./IncomeList";
import { MyButtons } from "./BudgetComponents/MyButtons";

export const Budget = () => {
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

            <MyButtons />
            <BudgetFormExpenses onSubmit={handleSubmit} />
            <BudgetFormExpenses onSubmit={handleExpenseSubmit} />
            <BudgetFormIncomes onSubmit={handleIncomesSubmit} />
            <ExpensesList expenses={expenses} />
            <IncomesList incomes={incomes} />

        </>
    )
}