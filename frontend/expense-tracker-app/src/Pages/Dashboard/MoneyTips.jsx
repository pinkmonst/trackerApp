import React from 'react';
import styled from 'styled-components';
import DashboardLayout from '../../components/layouts/Dashboardlayout';

const Title = styled.h1`
  color: #333;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  position: relative;
  padding-bottom: 15px;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #FF6B9D, #5A7BEF);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  font-weight: 300;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
`;

const TipsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TipCard = styled.div`
  background: ${props => props.color};
  border-radius: 12px;
  padding: 1.8rem;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-3px);
  }

  &:nth-child(5) {
    grid-column: 1 / -1;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const StepNumber = styled.div`
  background-color: white;
  color: ${props => props.color};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
`;

const TipTitle = styled.h2`
  color: white;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
`;

const TipContent = styled.p`
  color: rgba(255,255,255,0.95);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const DecorativeIcon = styled.span`
  margin-right: 10px;
  font-size: 1.2em;
`;

function MoneyTips() {
  return (
    <DashboardLayout activeMenu="Money Tips">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
      <Title>Finance Tips</Title>
      <Subtitle>Smart strategies to help you save, invest, and build financial freedom while in university</Subtitle>
      
      <TipsContainer>
        <TipCard color="#FF6B9D">
          <StepNumber color="#FF6B9D">1</StepNumber>
          <TipTitle><DecorativeIcon>🎯</DecorativeIcon> Set Clear Goals</TipTitle>
          <TipContent>
            Define what you're saving for - emergency fund (3-6 months of expenses), tuition payments, 
            or fun money for experiences. Start with small, achievable targets like saving $20 per week.
          </TipContent>
        </TipCard>
        
        <TipCard color="#5A7BEF">
          <StepNumber color="#5A7BEF">2</StepNumber>
          <TipTitle><DecorativeIcon>📊</DecorativeIcon> Track Your Spending</TipTitle>
          <TipContent>
            Use budgeting apps to visualize your cash flow. The 50/30/20 rule works well 
            for students: 50% needs, 30% wants, 20% savings. Audit subscriptions monthly.
          </TipContent>
        </TipCard>
        
        <TipCard color="#FF9E6B">
          <StepNumber color="#FF9E6B">3</StepNumber>
          <TipTitle><DecorativeIcon>📈</DecorativeIcon> Start Small Investments</TipTitle>
          <TipContent>
            Micro-investing apps let you invest spare change. Consider low-cost index 
            ETFs - even $5/week can grow significantly thanks to compound interest.
          </TipContent>
        </TipCard>
        
        <TipCard color="#6BB5FF">
          <StepNumber color="#6BB5FF">4</StepNumber>
          <TipTitle><DecorativeIcon>🎓</DecorativeIcon> Maximize Student Perks</TipTitle>
          <TipContent>
            Flash your student ID everywhere! Common discounts include software, transportation, 
            entertainment, and many local business offers.
          </TipContent>
        </TipCard>
        
        <TipCard color="#AD6BFF">
          <StepNumber color="#AD6BFF">5</StepNumber>
          <TipTitle><DecorativeIcon>💳</DecorativeIcon> Build Credit Wisely</TipTitle>
          <TipContent>
            Student credit cards often have no annual fees. Use for small purchases and pay 
            the full balance monthly to build excellent credit history.
          </TipContent>
        </TipCard>
      </TipsContainer>
      </div>
    </div>
    </div>
    </DashboardLayout>
    
  );
}

export default MoneyTips;