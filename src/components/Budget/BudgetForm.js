import { useState } from 'react';

export const BudgetForm = () => {
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');
    // const [gender, setGender] = useState('');
    // const [comment, setComment] = useState('');
    // const handleNameChange = (event) => setName(event.target.value);
    // const handleAgeChange = (event) => setAge(event.target.value);
    // const handleGenderChange = (event) => setGender(event.target.value);
    // const handleCommentChange = (event) => setComment(event.target.value);
    const handleSubmit = (event) => {
        event.preventDefault();

    }
    return <form className='budget-form' onSubmit={handleSubmit}>
        <label htmlFor="amount">Kwota </label>
        <input
            id="amount"
            type="number"

        // onChange={handleNameChange}
        />


        <label htmlFor="Category">Kategoria </label>
        <select id="Category"
        >

            <option>Jedzenie/Napoje</option>
            <option>Rachunki</option>
            <option>Rozrywka</option>
            <option>Zakupy</option>
            <option>Transport</option>
            <option>Rodzina</option>
            <option>Zwierzęta</option>
            <option>Podróże</option>
            <option>Inne</option>

        </select>


    </form>
}