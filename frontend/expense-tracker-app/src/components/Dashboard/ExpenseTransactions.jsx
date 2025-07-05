import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";


const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
       <div className="card ml-16 w-[790px] p-6 h-120">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Expenses</h3>
                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
  {transactions?.slice(0, 5)?.map((expense) => (
    
        <TransactionInfoCard
          key={expense.id}
          title={expense.category}
          icon={expense.icon}
          date={moment(expense.date).format("Do MMM YYYY")}
          amount={expense.amount}
          type="expense"
          hideableBtn
        />
      ))}
   
</div>
        </div>
    );
};

export default ExpenseTransactions;