import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#4A90E2", "#357ABD", "#A9CFFB"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    return (
        <div className="card ml-16 w-[790px] p-6 h-120">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Financial Overview</h2>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;