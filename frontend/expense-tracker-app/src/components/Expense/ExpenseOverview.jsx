import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    console.log("Prepared chart data:", result);
    setChartData(result);
    setLastUpdated(new Date().toLocaleTimeString());
  }, [transactions]);

  return (
    <div className="card ml-16 w-[1700px] h-[480px] p-6 flex flex-col justify-between mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-bold">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Get insights into your spending patterns and manage your money better.
          </p>
        </div>
        <button className="add-btn flex items-center gap-1" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="flex-1 flex justify-center items-center">
        {chartData.length === 0 ? (
          <p className="text-sm text-gray-400">No expense data to display.</p>
        ) : (
          <CustomLineChart data={chartData} />
        )}
      </div>

      {lastUpdated && (
        <p className="text-xs text-gray-500 text-right mt-2">
          Last updated at {lastUpdated}
        </p>
      )}
    </div>
  );
};

export default ExpenseOverview;
