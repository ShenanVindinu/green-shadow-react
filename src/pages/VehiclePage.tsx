import { useState } from "react";

const VehiclePage = () => {
    const [licensePlate, setLicensePlate] = useState("");
    const [vehicleCategory, setVehicleCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [vehicleStatus, setVehicleStatus] = useState("Select");
    const [remarks, setRemarks] = useState("");
    const [vehicleId, setVehicleId] = useState("");
    const [vehicles, setVehicles] = useState([
        { vehicleId: "N/A", licensePlate: "N/A", category: "N/A", fuelType: "N/A", status: "N/A", remarks: "N/A" },
        { vehicleId: "N/A", licensePlate: "N/A", category: "N/A", fuelType: "N/A", status: "N/A", remarks: "N/A" },
        { vehicleId: "N/A", licensePlate: "N/A", category: "N/A", fuelType: "N/A", status: "N/A", remarks: "N/A" },
        { vehicleId: "N/A", licensePlate: "N/A", category: "N/A", fuelType: "N/A", status: "N/A", remarks: "N/A" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSave = () => {
        if (licensePlate && vehicleCategory && fuelType && vehicleStatus !== "Select") {
            setVehicles([{
                vehicleId: vehicleId || "N/A",
                licensePlate,
                category: vehicleCategory,
                fuelType,
                status: vehicleStatus,
                remarks
            }, ...vehicles]);
            clearFields();
            alert("Vehicle details saved successfully!");
        } else {
            alert("Please fill out all fields correctly.");
        }
    };

    const handleUpdate = () => {
        if (vehicleId) {
            const updatedVehicles = vehicles.map(vehicle =>
                vehicle.vehicleId === vehicleId ? {
                    vehicleId,
                    licensePlate,
                    category: vehicleCategory,
                    fuelType,
                    status: vehicleStatus,
                    remarks
                } : vehicle
            );
            setVehicles(updatedVehicles);
            clearFields();
            alert("Vehicle details updated successfully!");
        } else {
            alert("Please provide a valid Vehicle ID to update.");
        }
    };

    const handleDelete = () => {
        if (vehicleId) {
            const filteredVehicles = vehicles.filter(vehicle => vehicle.vehicleId !== vehicleId);
            setVehicles(filteredVehicles);
            clearFields();
            alert("Vehicle details deleted successfully!");
        } else {
            alert("Please provide a valid Vehicle ID to delete.");
        }
    };

    const clearFields = () => {
        setLicensePlate("");
        setVehicleCategory("");
        setFuelType("");
        setVehicleStatus("Select");
        setRemarks("");
        setVehicleId("");
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedVehicles = [...vehicles].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setVehicles(sortedVehicles);
    };

    const paginatedVehicles = vehicles.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const totalPages = Math.ceil(vehicles.length / rowsPerPage);

    return (
        <section>
            <div className="mb-3">
                <label className="form-label">License Plate Number</label>
                <input
                    type="text"
                    className="form-control"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Vehicle Category</label>
                <input
                    type="text"
                    className="form-control"
                    value={vehicleCategory}
                    onChange={(e) => setVehicleCategory(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Fuel Type</label>
                <input
                    type="text"
                    className="form-control"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Vehicle Status</label>
                <select
                    className="form-select"
                    value={vehicleStatus}
                    onChange={(e) => setVehicleStatus(e.target.value)}
                >
                    <option>Select</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Remarks</label>
                <input
                    type="text"
                    className="form-control"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Vehicle ID</label>
                <input
                    type="text"
                    className="form-control"
                    value={vehicleId}
                    placeholder="Only add for delete and update"
                    onChange={(e) => setVehicleId(e.target.value)}
                />
            </div>

            <div className="btn-group mb-5 mt-4" role="group">
                <button type="button" className="btn btn-warning" onClick={handleSave}>Save</button>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>Update</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={clearFields}>Clear</button>
            </div>

            <table className="table table-striped" style={{ width: "100%" }}>
                <thead>
                <tr>
                    <th onClick={() => handleSort("vehicleId")}>Vehicle ID</th>
                    <th onClick={() => handleSort("licensePlate")}>License Plate Number</th>
                    <th onClick={() => handleSort("category")}>Vehicle Category</th>
                    <th onClick={() => handleSort("fuelType")}>Fuel Type</th>
                    <th onClick={() => handleSort("status")}>Vehicle Status</th>
                    <th onClick={() => handleSort("remarks")}>Remarks</th>
                </tr>
                </thead>
                <tbody>
                {paginatedVehicles.map((vehicle, index) => (
                    <tr key={index}>
                        <td>{vehicle.vehicleId}</td>
                        <td>{vehicle.licensePlate}</td>
                        <td>{vehicle.category}</td>
                        <td>{vehicle.fuelType}</td>
                        <td>{vehicle.status}</td>
                        <td>{vehicle.remarks}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-3">Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default VehiclePage;