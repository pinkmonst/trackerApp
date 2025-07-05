import React from 'react';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { LuDownload } from 'react-icons/lu';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
     <div className="card ml-16 w-[1700px] h-[250px] p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Income Sources</h2>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base"/>Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("DD MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;