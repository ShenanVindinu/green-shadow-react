import { Link } from "react-router-dom";

const Button = ({ to, icon, label, isActive }) => {
    return (
        <Link
            to={to}
            className={`flex items-center space-x-3 text-white px-4 py-2 transition-all duration-100 ${
                isActive ? "border-l-4 border-white" : "hover:text-white"
            }`}
        >
            <i className={`${icon} text-2xl`}></i>
            <span>{label}</span>
        </Link>
    );
};

export default Button;