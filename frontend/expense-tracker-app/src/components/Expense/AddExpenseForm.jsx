import React, { useState } from 'react'
import Inputs from "../../components/Inputs/Inputs";
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm=({onAddExpense})=> {
    const [income, setIncome] =useState({
        category:"",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange=(key, value)=> setIncome ({...income,[key]:value});
  return (
    <div>

        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon)=>handleChange("icon", selectedIcon)}
        />
        <Inputs
        value={income.category}
        onChange={({target})=> handleChange("category",target.value)}
        label="Expense Category"
        placeholder="Rent, Groceries, etc"
        type="text"
        />
        <Inputs
        value={income.amount}
        onChange={({target})=> handleChange("amount",target.value)}
        label="Amount"
        placeholder=""
        type="number"
        />
        <Inputs
        value={income.date}
        onChange={({target})=> handleChange("date",target.value)}
        label="Date"
        placeholder=""
        type="date"
        />

        <div className="flex justify-end mt-6">
            <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={()=>onAddExpense(income)}
            >
                Add Expense
            </button>
        </div>
        
    </div>
  )
}

export default AddExpenseForm