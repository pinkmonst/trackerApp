import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className="side-menu h-full w-64 flex flex-col bg-gray-50 border-r border-gray-200">
            <div className="profile-section p-6 flex flex-col items-center">
                <div className="relative mb-4">
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-semibold text-gray-600 border-4 border-white shadow-md">
                            {user?.fullName?.charAt(0) || "U"}
                        </div>
                    )}
                </div>
                <h5 className="username text-lg font-semibold text-gray-800">
                    {user?.fullName || "User"}
                </h5>
                <p className="text-sm text-gray-500 mt-1">
                    {user?.email || ""}
                </p>
            </div>

            <div className="menu-items p-4 flex-1 overflow-y-auto">
                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`menu-item w-full flex items-center gap-4 text-[15px] font-medium ${
                            activeMenu === item.label 
                                ? "text-white bg-blue-600" 
                                : "text-gray-700 hover:bg-gray-100"
                        } py-3 px-4 rounded-lg mb-2 transition-colors duration-200`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className="text-lg" />
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200">
                <button
                    className="w-full flex items-center gap-4 text-[15px] font-medium text-gray-700 hover:bg-gray-100 py-3 px-4 rounded-lg transition-colors duration-200"
                    onClick={handleLogout}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideMenu;