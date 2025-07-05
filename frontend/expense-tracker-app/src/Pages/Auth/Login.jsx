import React, { useState, useContext } from 'react';
import AuthLayouts from '../../components/layouts/AuthLayouts';
import { Link,useNavigate } from 'react-router-dom';
import Inputs from "../../components/Inputs/Inputs";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const {updateUser}=useContext(UserContext);

    const navigate = useNavigate();

   // Handle Login Form Submit
const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
    }

    if (!password) {
        setError("Please enter the password");
        return;
    }

    setError("");

    // Login API Call
try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
    });

    const { token, user } = response.data;
    console.log("Logged in user:", user);  // optional debug

    if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
    }
} catch (error) {
    console.log("Login error:", error.response?.data);

    if (error.response?.status === 400 && error.response.data?.message) {
        setError(error.response.data.message);
    } else {
        setError("Login failed. Please try again.");
    }
}

   
};


    return (
        <AuthLayouts>
            <div className="lg:w-1/2 h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-black mb-2">Welcome Back</h3>
                <p className="text-sm text-slate-700 mb-6">
                    Please enter your details to log in
                </p>
                <form onSubmit={handleLogin}>
                 <Inputs
                    value={email}
                   onChange={(e) => setEmail(e.target.value)}
                    name="email"
                     placeholder="john@example.com"
                    type="text"
                  />
                   <Inputs
                    value={password}
                   onChange={(e) => setPassword(e.target.value)}
                    name="Password"
                     placeholder="Min 8 Characters"
                    type="password"
                  />
                  {error && <p className="text-red-500 text-xs pl-2.5">{error}</p>}

                  <button type="submit" className="btn-primary">
                   LOGIN
                  </button>

                  <p className="text-[13px] text-slate-800 mt-3">
                              Don't have an account?{" "}
                  <Link className="font-medium text-primary underline" to="/signup">
                   Sign Up
                   </Link>
                  </p>

                  </form>
            </div>
        </AuthLayouts>
    );
};

export default Login;
