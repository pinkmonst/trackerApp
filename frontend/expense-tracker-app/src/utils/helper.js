import moment from 'moment';


export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return chartData;
};





export const prepareIncomeBarChartData = (data = []) => {
   const sortedData= [...data].sort((a,b)=> new Date(a.date)-new Date(b.date));

   const chartData= sortedData.map((item)=>({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source:item?.source,
   }));
   return chartData;
};

export const prepareExpenseLineChartData = (transactions) => {
  const monthlyTotals = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString('default', { month: 'short' });
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }
    monthlyTotals[month] += Number(tx.amount);
  });

  return Object.entries(monthlyTotals).map(([month, amount]) => ({
    month,
    amount
  }));
};
