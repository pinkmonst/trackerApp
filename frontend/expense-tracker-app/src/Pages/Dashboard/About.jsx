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

const FeaturesContainer = styled.div`
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

const FeatureCard = styled.div`
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

const FeatureNumber = styled.div`
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

const FeatureTitle = styled.h2`
  color: white;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
`;

const FeatureContent = styled.p`
  color: rgba(255,255,255,0.95);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const DecorativeIcon = styled.span`
  margin-right: 10px;
  font-size: 1.2em;
`;

function AboutUs() {
  return (
    <DashboardLayout activeMenu="About">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
      <Title>About Our Expense Tracker</Title>
      <Subtitle>Take control of your finances with our powerful yet simple tool designed to help you track expenses, monitor income, and achieve your financial goals</Subtitle>
      
      <FeaturesContainer>
        <FeatureCard color="#FF6B9D">
          <FeatureNumber color="#FF6B9D">1</FeatureNumber>
          <FeatureTitle><DecorativeIcon>💰</DecorativeIcon> Track Every Transaction</FeatureTitle>
          <FeatureContent>
            Easily record both expenses and income in seconds. Our intuitive interface makes it simple to log purchases, bills, and earnings as they happen.
          </FeatureContent>
        </FeatureCard>
        
        <FeatureCard color="#5A7BEF">
          <FeatureNumber color="#5A7BEF">2</FeatureNumber>
          <FeatureTitle><DecorativeIcon>📊</DecorativeIcon> Real-time Insights</FeatureTitle>
          <FeatureContent>
            Get instant visual summaries of your spending patterns. See where your money goes each month with beautiful charts and categorized breakdowns.
          </FeatureContent>
        </FeatureCard>
        
        <FeatureCard color="#FF9E6B">
          <FeatureNumber color="#FF9E6B">3</FeatureNumber>
          <FeatureTitle><DecorativeIcon>🔔</DecorativeIcon> Smart Alerts</FeatureTitle>
          <FeatureContent>
            Receive notifications when you're approaching budget limits or when unusual spending patterns are detected, helping you stay on track.
          </FeatureContent>
        </FeatureCard>
        
        <FeatureCard color="#6BB5FF">
          <FeatureNumber color="#6BB5FF">4</FeatureNumber>
          <FeatureTitle><DecorativeIcon>📱</DecorativeIcon> Always Accessible</FeatureTitle>
          <FeatureContent>
            Access your financial data anytime, anywhere. Our app syncs across all your devices so you're always up-to-date.
          </FeatureContent>
        </FeatureCard>
        
        <FeatureCard color="#AD6BFF">
          <FeatureNumber color="#AD6BFF">5</FeatureNumber>
          <FeatureTitle><DecorativeIcon>🎯</DecorativeIcon> Goal Tracking</FeatureTitle>
          <FeatureContent>
            Set and monitor financial goals like saving for a vacation, paying off debt, or building an emergency fund. We'll help you measure progress and stay motivated.
          </FeatureContent>
        </FeatureCard>
      </FeaturesContainer>
      </div>
    </div>
    </div>
    </DashboardLayout>
  );
}

export default AboutUs;