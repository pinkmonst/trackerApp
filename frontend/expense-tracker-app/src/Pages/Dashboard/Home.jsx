import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/Dashboardlayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import InfoCard from "../../components/Cards/Infocards";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
     
        <div className="mb-6 text-center">
         
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-7xl mx-auto">
            <p className="text-lg italic text-gray-600">
              "Every dollar you save is a seed for your future wealth. Water it with wisdom, and watch your financial freedom grow."
            </p>
            {dashboardData?.totalBalance > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                You're on track! Your current balance is nurturing {Math.floor(dashboardData.totalBalance/100)} financial seeds.
              </p>
            )}
          </div>
        </div>

      
        {dashboardData && (
          <div className="mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-100 w-160 h-74 mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Financial Health</h2>
            
           
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Savings Ratio</span>
                <span className="text-sm font-bold">
                  {dashboardData.totalIncome > 0 
                    ? `${Math.round((dashboardData.totalBalance / dashboardData.totalIncome) * 100)}%` 
                    : "N/A"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-green-400 h-2.5 rounded-full" 
                  style={{
                    width: `${dashboardData.totalIncome > 0 
                      ? Math.min(100, Math.round((dashboardData.totalBalance / dashboardData.totalIncome) * 100)) 
                      : 0}%`
                  }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {dashboardData.totalIncome > 0 
                  ? `You've saved ${Math.round((dashboardData.totalBalance / dashboardData.totalIncome) * 100)}% of your income` 
                  : "Track your income to see savings ratio"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Income</p>
                <div className="flex items-center">
                  <div 
                    className="bg-green-100 h-4 rounded-l-full" 
                    style={{
                      width: `${dashboardData.totalIncome + dashboardData.totalExpense > 0 
                        ? Math.round((dashboardData.totalIncome / (dashboardData.totalIncome + dashboardData.totalExpense)) * 100) 
                        : 50}%`
                    }}
                  ></div>
                  <span className="ml-2 text-xs font-medium">
                    {addThousandsSeparator(dashboardData.totalIncome || 0)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Expenses</p>
                <div className="flex items-center">
                  <div 
                    className="bg-red-100 h-4 rounded-l-full" 
                    style={{
                      width: `${dashboardData.totalIncome + dashboardData.totalExpense > 0 
                        ? Math.round((dashboardData.totalExpense / (dashboardData.totalIncome + dashboardData.totalExpense)) * 100) 
                        : 50}%`
                    }}
                  ></div>
                  <span className="ml-2 text-xs font-medium">
                    {addThousandsSeparator(dashboardData.totalExpense || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                {dashboardData.totalExpense > dashboardData.totalIncome 
                  ? "💡 Tip: Your expenses exceed income. Consider reviewing your spending habits." 
                  : dashboardData.totalBalance > 0 
                    ? "💡 Great job! You're living within your means. Consider investing your savings." 
                    : "💡 Start building your financial future by tracking every transaction."}
              </p>
            </div>
          </div>
        )}

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dashboardData && (
            <>
              <InfoCard
                icon={<LuWalletMinimal size={30} className="text-blue-500" />}
                label="Total Balance"
                value={addThousandsSeparator(dashboardData.totalBalance || 0)}
                type="primary"
                bgColor="bg-blue-100"
              />

              <InfoCard
                icon={<LuHandCoins size={30} className="text-green-500" />}
                label="Total Income"
                value={addThousandsSeparator(dashboardData.totalIncome || 0)}
                type="success"
                bgColor="bg-green-100"
              />

              <InfoCard
                icon={<IoMdCard size={30} className="text-red-500" />}
                label="Total Expense"
                value={addThousandsSeparator(dashboardData.totalExpense || 0)}
                type="danger"
                bgColor="bg-red-100"
              />
              
              
            </>
          )}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          /> 

          <ExpenseTransactions 
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}   
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />
          
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;