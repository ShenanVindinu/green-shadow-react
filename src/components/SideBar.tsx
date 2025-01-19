import { useState } from "react";

const Sidebar = () => {
    const [active, setActive] = useState("Users");

    const menuItems = [
        { id: "Users", icon: "bx bx-user-circle", label: "Users" },
        { id: "Vehicle", icon: "bx bx-car", label: "Vehicle" },
        { id: "Staff", icon: "bx bx-user", label: "Staff" },
        { id: "Fields", icon: "bx bx-square", label: "Fields" },
        { id: "MonitoringLog", icon: "bx bx-detail", label: "Monitoring Log" },
        { id: "Equipments", icon: "bx bx-wrench", label: "Equipments" },
        { id: "Crops", icon: "bx bxs-florist", label: "Crops" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
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
                            <a
                                key={item.id}
                                href="#"
                                className={`flex items-center space-x-3 text-white px-4 py-2 transition-all duration-100 ${
                                    active === item.id
                                        ? "border-l-4 border-white" // Only the vertical line is white when active
                                        : "hover:text-white"
                                }`}
                                onClick={() => setActive(item.id)}
                            >
                                <i className={`${item.icon} text-2xl`}></i>
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Bottom Section */}
                <div className="py-4">
                    <a
                        href="#"
                        className="flex items-center space-x-3 text-white px-4 py-2 transition-all duration-300 hover:text-white"
                    >
                        <i className="bx bx-log-out text-2xl"></i>
                        <span>SignOut</span>
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <main className="ml-60 w-full p-6">
                <h1 className="text-2xl font-bold">Dashboard Content</h1>
                <p className="mt-4">This is the main content area.</p>
            </main>
        </div>
    );
};

export default Sidebar;
