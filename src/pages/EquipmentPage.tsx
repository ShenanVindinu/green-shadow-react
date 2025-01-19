import { useState } from "react";

const EquipmentPage = () => {
    const [equipmentData, setEquipmentData] = useState({
        equipmentName: "",
        equipmentType: "Select",
        equipmentStatus: "Select",
        equipmentStaffId: "",
        equipmentId: "",
    });

    const [equipmentList, setEquipmentList] = useState([
        { equipmentId: "1", equipmentName: "Equipment 1", equipmentType: "ELECTRICAL", equipmentStatus: "AVAILABLE", equipmentStaffId: "101" },
        { equipmentId: "2", equipmentName: "Equipment 2", equipmentType: "MECHANICAL", equipmentStatus: "UNAVAILABLE", equipmentStaffId: "102" },
        { equipmentId: "3", equipmentName: "Equipment 3", equipmentType: "ELECTRICAL", equipmentStatus: "AVAILABLE", equipmentStaffId: "103" },
        { equipmentId: "4", equipmentName: "Equipment 4", equipmentType: "MECHANICAL", equipmentStatus: "UNAVAILABLE", equipmentStaffId: "104" },
        { equipmentId: "5", equipmentName: "Equipment 5", equipmentType: "ELECTRICAL", equipmentStatus: "AVAILABLE", equipmentStaffId: "105" },
        { equipmentId: "6", equipmentName: "Equipment 6", equipmentType: "MECHANICAL", equipmentStatus: "UNAVAILABLE", equipmentStaffId: "106" },
        { equipmentId: "7", equipmentName: "Equipment 7", equipmentType: "ELECTRICAL", equipmentStatus: "AVAILABLE", equipmentStaffId: "107" },
        { equipmentId: "8", equipmentName: "Equipment 8", equipmentType: "MECHANICAL", equipmentStatus: "UNAVAILABLE", equipmentStaffId: "108" },
        { equipmentId: "9", equipmentName: "Equipment 9", equipmentType: "ELECTRICAL", equipmentStatus: "AVAILABLE", equipmentStaffId: "109" },
        { equipmentId: "10", equipmentName: "Equipment 10", equipmentType: "MECHANICAL", equipmentStatus: "UNAVAILABLE", equipmentStaffId: "110" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSave = () => {
        if (equipmentData.equipmentName && equipmentData.equipmentType !== "Select" && equipmentData.equipmentStatus !== "Select") {
            const newEquipment = {
                equipmentId: equipmentData.equipmentId || "N/A",
                equipmentName: equipmentData.equipmentName,
                equipmentType: equipmentData.equipmentType,
                equipmentStatus: equipmentData.equipmentStatus,
                equipmentStaffId: equipmentData.equipmentStaffId,
            };
            setEquipmentList([newEquipment, ...equipmentList]);
            clearFields();
            alert("Equipment saved successfully!");
        } else {
            alert("Please fill out all required fields.");
        }
    };

    const handleUpdate = () => {
        if (equipmentData.equipmentId) {
            const updatedEquipmentList = equipmentList.map(item =>
                item.equipmentId === equipmentData.equipmentId
                    ? { ...equipmentData }
                    : item
            );
            setEquipmentList(updatedEquipmentList);
            clearFields();
            alert("Equipment updated successfully!");
        } else {
            alert("Please provide a valid Equipment ID to update.");
        }
    };

    const handleDelete = () => {
        if (equipmentData.equipmentId) {
            const filteredEquipmentList = equipmentList.filter(item => item.equipmentId !== equipmentData.equipmentId);
            setEquipmentList(filteredEquipmentList);
            clearFields();
            alert("Equipment deleted successfully!");
        } else {
            alert("Please provide a valid Equipment ID to delete.");
        }
    };

    const clearFields = () => {
        setEquipmentData({
            equipmentName: "",
            equipmentType: "Select",
            equipmentStatus: "Select",
            equipmentStaffId: "",
            equipmentId: "",
        });
    };

    const handleSort = (key) => {
        const direction = sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });

        const sortedList = [...equipmentList].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setEquipmentList(sortedList);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = equipmentList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section id="equipmentSection">
            <div className="mb-3">
                <label htmlFor="equipmentNameField" className="form-label">Equipment Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="equipmentNameField"
                    value={equipmentData.equipmentName}
                    onChange={(e) => setEquipmentData({ ...equipmentData, equipmentName: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="equipmentTypeSelect" className="form-label">Equipment Type</label>
                <select
                    className="form-select"
                    id="equipmentTypeSelect"
                    value={equipmentData.equipmentType}
                    onChange={(e) => setEquipmentData({ ...equipmentData, equipmentType: e.target.value })}
                >
                    <option value="Select">Select</option>
                    <option value="ELECTRICAL">ELECTRICAL</option>
                    <option value="MECHANICAL">MECHANICAL</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="equipmentStatusSelect" className="form-label">Equipment Status</label>
                <select
                    className="form-select"
                    id="equipmentStatusSelect"
                    value={equipmentData.equipmentStatus}
                    onChange={(e) => setEquipmentData({ ...equipmentData, equipmentStatus: e.target.value })}
                >
                    <option value="Select">Select</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="equipmentStaffIdField" className="form-label">Equipment Staff Id</label>
                <input
                    type="text"
                    className="form-control"
                    id="equipmentStaffIdField"
                    value={equipmentData.equipmentStaffId}
                    onChange={(e) => setEquipmentData({ ...equipmentData, equipmentStaffId: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="equipmentIdField" className="form-label">Equipment ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="equipmentIdField"
                    placeholder="Only add for delete and update"
                    value={equipmentData.equipmentId}
                    onChange={(e) => setEquipmentData({ ...equipmentData, equipmentId: e.target.value })}
                />
            </div>

            <div className="btn-group mb-5 mt-4" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-warning" onClick={handleSave}>Save</button>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>Update</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={clearFields}>Clear</button>
            </div>

            <table className="table table-striped" style={{ width: "100%" }}>
                <thead>
                <tr>
                    <th onClick={() => handleSort("equipmentId")}>Equipment ID</th>
                    <th onClick={() => handleSort("equipmentName")}>Equipment Name</th>
                    <th onClick={() => handleSort("equipmentType")}>Equipment Type</th>
                    <th onClick={() => handleSort("equipmentStatus")}>Equipment Status</th>
                    <th onClick={() => handleSort("equipmentStaffId")}>Equipment Staff Id</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.equipmentId}</td>
                        <td>{item.equipmentName}</td>
                        <td>{item.equipmentType}</td>
                        <td>{item.equipmentStatus}</td>
                        <td>{item.equipmentStaffId}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th>Equipment ID</th>
                    <th>Equipment Name</th>
                    <th>Equipment Type</th>
                    <th>Equipment Status</th>
                    <th>Equipment Staff Id</th>
                </tr>
                </tfoot>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(Math.ceil(equipmentList.length / itemsPerPage))].map((_, index) => (
                        <li className="page-item" key={index}>
                            <button
                                className="page-link"
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
};

export default EquipmentPage;