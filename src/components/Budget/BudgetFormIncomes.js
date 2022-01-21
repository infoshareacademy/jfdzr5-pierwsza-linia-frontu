import React, { useState } from 'react';



function BudgetFormIncomes(props) {
    const [amountInput, setAmountInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('Wynagrodzenie');
    const [dateInput, setDateInput] = useState('');
    const handleAmountChange = (event) => setAmountInput(event.target.value);
    const handleCategoryChange = (event) => setCategoryInput(event.target.value);
    const handleDateChange = (event) => setDateInput(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            amount: parseInt(amountInput),
            category: categoryInput,
            date: dateInput,
        })

    }
    return <form className='budget-form' onSubmit={handleSubmit}>
        <label>Kwota </label>
        <input
            type="number"
            placeholder='Podaj kwotę...'
            value={amountInput}
            onChange={handleAmountChange}
        />


        <label>Kategoria </label>
        <select id="Category" value={categoryInput} onChange={handleCategoryChange}
        >

            <option>Wynagrodzenie</option>
            <option>Inne</option>

        </select>

        <label htmlFor='Date'>Data </label>
        <input type='date'
            value={dateInput}
            onChange={handleDateChange}
        />

        <button>Zatwierdź</button>



    </form>
}

export default BudgetFormIncomes;