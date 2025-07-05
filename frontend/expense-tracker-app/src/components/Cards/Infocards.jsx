import React, { useState } from 'react';

const InfoCards = ({ icon, label, value, color = "text-primary" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getFortune = () => {
    const fortunes = {
      'Total Balance': [
        "💰 Your money tree is blossoming!",
        "🪙 Stacking coins like a dragon!",
        "🌱 Small balances grow into mighty oaks",
        "💎 You're mining financial diamonds"
      ],
      'Total Income': [
        "🚀 Your income rocket is taking off!",
        "🌊 Money flows like a mighty river",
        "🎯 Bullseye! More income streams coming",
        "🍯 Sweet honey money dripping in"
      ],
      'Total Expense': [
        "🦉 Wise spending leads to wealth",
        "✂️ Trimming expenses grows your garden",
        "🧾 Every receipt tells a financial story",
        "🛒 Smart spending is silent wealth"
      ]
    };

    const categoryFortunes = fortunes[label] || ["✨ Your financial magic is working"];
    return categoryFortunes[Math.floor(Math.random() * categoryFortunes.length)];
  };


  const getAnimatedEmoji = () => {
    const emojis = {
      'Total Balance': isHovered ? "🤑" : "💰",
      'Total Income': isHovered ? "💸" : "📈",
      'Total Expense': isHovered ? "🧾" : "💳"
    };
    return emojis[label] || "✨";
  };


  const displayValue = () => {
    const symbols = {
      'Total Balance': "🪙",
      'Total Income': "💵",
      'Total Expense': "💸"
    };
    return `${symbols[label] || "💰"} ${value}`;
  };

  return (
    <div 
      className="flex justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-3 rounded-xl shadow-md bg-white space-y-2 w-100 transition-all duration-300 ${isHovered ? "transform hover:-translate-y-1 hover:shadow-lg" : ""}`}>
      
        <div className="text-3xl text-center mb-2 animate-bounce">
          {getAnimatedEmoji()}
        </div>

     
        <div className={`w-14 h-14 flex items-center justify-center rounded-full mx-auto transition-colors duration-500 ${isHovered ? "bg-gradient-to-br from-yellow-100 to-blue-100" : "bg-gray-100"}`}>
          {icon}
        </div>

     
        <h6 className={`text-sm font-medium text-center transition-all duration-300 ${isHovered ? "text-gray-800 scale-105" : "text-gray-600"}`}>
          {label}
        </h6>

        
        <span className={`text-xl font-bold ${color} block text-center transition-all duration-500 ${isHovered ? "scale-110" : ""}`}>
          {displayValue()}
        </span>
        
       
        <div className={`text-xs text-center italic mt-2 transition-all duration-700 ${isHovered ? "text-purple-600 font-medium" : "text-gray-500"}`}>
          {getFortune()}
        </div>

        {label === 'Total Balance' && value > 0 && (
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000 ease-out" 
              style={{ width: `${Math.min(100, (value / 10000) * 100)}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCards;