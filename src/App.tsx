import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import UsersPage from "./pages/UserPage.tsx";
import VehiclePage from "./pages/VehiclePage.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import EquipmentPage from "./pages/EquipmentPage.tsx";
import CropPage from "./pages/CropPage.tsx";
import MonitoringLogPage from "./pages/MonitoringLogPage.tsx";
import FieldPage from "./pages/FieldPage.tsx";

function App() {
    return (
        <Router>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="ml-60 w-full p-6">
                    <Routes>
                        <Route path="/" element={<h1>Dashboard Content</h1>} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/vehicle" element={<VehiclePage />} />
                        <Route path="/staff" element={<StaffPage />} />
                        <Route path="/fields" element={<FieldPage />} />
                        <Route path="/monitoring-log" element={<MonitoringLogPage />} />
                        <Route path="/equipments" element={<EquipmentPage />} />
                        <Route path="/crops" element={<CropPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;