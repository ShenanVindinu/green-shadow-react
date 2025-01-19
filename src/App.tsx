import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import UsersPage from "./pages/UserPage.tsx";
import VehiclePage from "./pages/VehiclePage.tsx";

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
                        <Route path="/staff" element={<h1>Staff Page</h1>} />
                        <Route path="/fields" element={<h1>Fields Page</h1>} />
                        <Route path="/monitoring-log" element={<h1>Monitoring Log Page</h1>} />
                        <Route path="/equipments" element={<h1>Equipments Page</h1>} />
                        <Route path="/crops" element={<h1>Crops Page</h1>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;