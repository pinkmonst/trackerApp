import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
    return (
             <div className="card ml-16 w-[790px] p-6 h-120">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Income</h3>
                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="space-y-4">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("DD MMM YYYY")}
                        amount={item.amount}
                        type="income"
                        hideDelete
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentIncome;