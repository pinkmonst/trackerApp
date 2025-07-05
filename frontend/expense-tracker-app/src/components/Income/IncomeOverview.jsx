import React, { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';


const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);

useEffect(() => {
   
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  return ()=>{};
  
}, [transactions]);



    return (
        <div className="card ml-16 w-[1700px] h-[480px] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-bold">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button className="add-btn flex items-center gap-1" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <CustomBarChart data={chartData} />
            </div>

            {lastUpdated && (
                <p className="text-xs text-gray-500 text-right mt-2">
                    Last updated at {lastUpdated}
                </p>
            )}
        </div>
    );
};

export default IncomeOverview;
