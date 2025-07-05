import React, { useState, useEffect } from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
    LabelList
} from 'recharts';
import { prepareExpenseBarChartData } from '../../utils/helper';

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        setLastUpdated(new Date().toLocaleTimeString());
    }, [data]);

    const renderCustomizedLabel = (props) => {
        const { x, y, width, value } = props;
        const radius = 10;

        return (
            <text
                x={x + width / 2}
                y={y - radius}
                fill="#000"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
            >
                {value}
            </text>
        );
    };

    return (
        <div className="card ml-16 w-[790px] h-[480px] p-6 flex flex-col justify-between bg-white shadow rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-gray-800">Last 30 Days Expenses</div>
                {lastUpdated && (
                    <p className="text-xs text-gray-500">
                        Last updated at {lastUpdated}
                    </p>
                )}
            </div>
            <div className="flex-1 flex justify-center items-center">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" barSize={20} fill="#4f46e5">
                                <LabelList dataKey="amount" content={renderCustomizedLabel} />
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500">No data available</p>
                )}
            </div>
        </div>
    );
};

export default Last30DaysExpenses;