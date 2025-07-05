import React from "react";
import { LuArrowRight } from "react-icons/lu"; 
import moment from 'moment'
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
     <div className="card ml-16 w-[790px] p-6 h-128">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold">Recent Transactions</h5>
        <button className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="space-y-4">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.type === 'expense' ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
          

        ))}
        
      </div>
    </div>
  );
};

export default RecentTransactions;