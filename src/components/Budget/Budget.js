import BudgetFormExpenses from "./BudgetComponents/BudgetFormExpenses";
import BudgetFormIncomes from "./BudgetComponents/BudgetFormIncomes";
import ExpensesList from "./BudgetComponents/ExpensesList";
import IncomesList from "./BudgetComponents/IncomesList";
import { MyButtons } from "./BudgetComponents/MyButtons";
import { useState } from "react";

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
            {/* <BudgetFormExpenses onSubmit={handleSubmit} /> */}
            <BudgetFormExpenses onSubmit={handleExpenseSubmit} />
            <BudgetFormIncomes onSubmit={handleIncomesSubmit} />
            <ExpensesList expenses={expenses} />
            <IncomesList incomes={incomes} />

        </>
    )
}