import { useLocation } from "react-router-dom";
import Button from "./Button"; // Import the Button component

const Sidebar = () => {
    const location = useLocation(); // Get the current route
    const menuItems = [
        { id: "/users", icon: "bx bx-user-circle", label: "Users" },
        { id: "/vehicle", icon: "bx bx-car", label: "Vehicle" },
        { id: "/staff", icon: "bx bx-user", label: "Staff" },
        { id: "/fields", icon: "bx bx-square", label: "Fields" },
        { id: "/monitoring-log", icon: "bx bx-detail", label: "Monitoring Log" },
        { id: "/equipments", icon: "bx bx-wrench", label: "Equipments" },
        { id: "/crops", icon: "bx bxs-florist", label: "Crops" },
    ];

    return (
        <div
            className="fixed top-0 left-0 h-screen w-60 shadow-lg z-40 flex flex-col justify-between"
            style={{ backgroundColor: "#8FD14F" }}
        >
            {/* Sidebar Top Section */}
            <div className="py-6">
                {/* Sidebar Logo */}
                <div className="flex items-center space-x-3 mb-14 px-4">
                    <i className="bx bx-leaf text-white text-3xl"></i>
                    <span className="text-white text-lg font-bold">Green Shadow</span>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-6">
                    {menuItems.map((item) => (
                        <Button
                            key={item.id}
                            to={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={location.pathname === item.id}
                        />
                    ))}
                </nav>
            </div>

            {/* Sidebar Bottom Section */}
            <div className="py-4">
                <Button
                    to="/logout"
                    icon="bx bx-log-out"
                    label="Sign Out"
                    isActive={false} // Logout is not an active link
                />
            </div>
        </div>
    );
};

export default Sidebar;