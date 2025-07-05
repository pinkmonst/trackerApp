import React from "react";
import CARD_2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from "react-icons/lu";
import { FiPieChart, FiDollarSign } from "react-icons/fi";


const AuthLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            
            <div className="w-full md:w-[45%] h-64 md:h-auto bg-gradient-to-r from-blue-500 to-blue-600 p-6 md:p-12 relative overflow-hidden">
          
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute w-32 h-32 rounded-full bg-white top-1/4 -left-16"></div>
                    <div className="absolute w-48 h-48 rounded-full bg-white bottom-0 right-0"></div>
                    <div className="absolute w-24 h-24 rounded-lg bg-white top-1/2 right-1/4 rotate-45"></div>
                </div>
                
            
                <div className="relative z-10 h-full flex flex-col">
                    <h1 className="text-2xl font-bold text-white mb-4">Finlogix</h1>
                    <p className="text-blue-100 max-w-md mb-8">Manage your finances with ease and precision</p>
                    
                    <div className="mt-auto space-y-6 hidden md:block">
                        <FeatureItem 
                            icon={<FiPieChart className="text-blue-300" size={24} />}
                            title="Visual Analytics"
                            description="Understand your spending patterns with beautiful charts"
                        />
                        <FeatureItem 
                            icon={<FiDollarSign className="text-blue-300" size={24} />}
                            title="Smart Budgeting"
                            description="Set limits and get alerts when you're overspending"
                        />
                    </div>
                </div>
            </div>

           
            <div className="w-full md:w-[55%] p-6 md:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                 
                    <div className="md:hidden mb-8">
                        <StatsInfoCard
                            icon={<LuTrendingUpDown className="text-blue-100" />}
                            label="Track Your Income & Expenses"
                            value="430,000"
                            color="bg-blue-600"
                        />
                    </div>
                   
                    <div className="space-y-6">
                        {React.cloneElement(children, {
                            className: "space-y-6 [&_input]:text-lg [&_input]:p-4 [&_input]:h-14 [&_button]:text-lg [&_button]:p-4"
                        })}
                    </div>
                    
                   
                    <div className="mt-12 md:hidden flex justify-center">
                        <img
                            src={CARD_2}
                            className="w-64 object-contain shadow-lg rounded-xl"
                            alt="Expense tracker illustration"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex gap-4 bg-white p-5 rounded-xl shadow-lg border border-blue-100">
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] ${color} rounded-full`}>
                {icon}
            </div>
            <div>
                <h6 className="text-sm text-blue-600 font-medium mb-1">{label}</h6>
                <span className="text-2xl font-bold text-blue-800">${value}</span>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, title, description }) => {
    return (
        <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-400/20 rounded-lg">{icon}</div>
            <div>
                <h3 className="text-white font-medium">{title}</h3>
                <p className="text-blue-100 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default AuthLayout;