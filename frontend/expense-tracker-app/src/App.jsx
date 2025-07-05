import Reacr from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Dashboard/Home";
import Income from "./Pages/Dashboard/Income";
import Expense from "./Pages/Dashboard/Expense";
import UserProvider from "./context/userContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoneyTips from "./Pages/Dashboard/MoneyTips";
import About from "./Pages/Dashboard/About";



const App = () => {
    return (
        <UserProvider>
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/moneytips" element={<MoneyTips />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router>
             <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        </div>
        </UserProvider>
    );
};

export default App;

const Root = () => {
    // Check if token exists in localStorage
    const isAuthenticated = !!localStorage.getItem("token");

    // Redirect to dashboard if authenticated, otherwise to login
    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
};