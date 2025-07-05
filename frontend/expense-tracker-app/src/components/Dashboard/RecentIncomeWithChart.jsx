import React ,{useEffect,useState} from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#4A90E2", "#357ABD", "#1C3F94", "#A9CFFB"];

const RecentIncomeWithChart = ({data, totalIncome}) => {

    const [chartData, setChartData] = useState([]);

const prepareChartData = () => {
    const dataArr = data?.map((item) => ({   
    name: item?.source,
    amount: item?.amount,
    }));
    setChartData(dataArr );
};

useEffect(() => {
    prepareChartData();
    console.log('Chart Data:', chartData);
    return () => {}
}, [data]);

    return (
  <div className="card ml-16 w-[790px] p-6 h-120">
    <div className="flex items-center justify-between ">
    <h5 className="text-lg font-bold">Last 60 Days Income</h5>
    </div>

    <CustomPieChart
    data={chartData}
    label="Total Income"
   totalAmount={`$${totalIncome}`}
    showTextAnchor={true}
    colors={COLORS}
    />
    </div>
    )
}

export default RecentIncomeWithChart;