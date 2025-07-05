import React, { useState, useContext } from 'react';
import AuthLayouts from '../../components/layouts/AuthLayouts';
import { Link, useNavigate } from 'react-router-dom';
import Inputs from "../../components/Inputs/Inputs";
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

      const {updateUser}=useContext(UserContext);
    const navigate = useNavigate();

    // Handle Sign Up Form Submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl="";

        if (!fullName) {
            setError("Please enter your full name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setError("");
       

        // SignUp API Call

        // Upload image if present
// Upload image if present
if (profilePic) {
    const imgUploadRes = await uploadImage(profilePic);
    profileImageUrl = imgUploadRes.imageUrl || "";
}
try {
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
         profileImageUrl,
    });
    const { token, user } = response.data;

    if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
    }
} catch (error) {
    if (error.response && error.response.data.message) {
        setError(error.response.data.message);
    } else {
        setError("Something went wrong. Please try again.");
    }
}
    };

    return (
        <AuthLayouts>
            <div className="lg:w-1/2 h-3/4 md:h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-black mb-2">Create an Account</h3>
                <p className="text-sm text-slate-700 mb-6">
                    Join us today by entering your details below.
                </p>
              

                <form onSubmit={handleSignUp}>

                  <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
                  
                    <Inputs
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        name="fullName"
                        placeholder="John Doe"
                        type="text"
                    />
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
                        name="password"
                        placeholder="Min 8 Characters"
                        type="password"
                    />
                    {error && <p className="text-red-500 text-xs pl-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        SIGN UP
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/login">
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayouts>
    );
};

export default SignUp;