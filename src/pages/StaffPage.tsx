import { useState } from "react";

const StaffPage = () => {
    const [staffData, setStaffData] = useState({
        firstName: "",
        lastName: "",
        role: "Choose Role",
        gender: "Choose Gender",
        vehicle: "",
        designation: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address5: "",
        joinedDate: "",
        dob: "",
        contactNumber: "",
        email: "",
        staffId: "",
    });

    const [staffMembers, setStaffMembers] = useState([
        { staffId: "N/A", name: "N/A", gender: "N/A", designation: "N/A", role: "N/A", joinedDate: "N/A", vehicle: "N/A" },
        { staffId: "N/A", name: "N/A", gender: "N/A", designation: "N/A", role: "N/A", joinedDate: "N/A", vehicle: "N/A" },
        { staffId: "N/A", name: "N/A", gender: "N/A", designation: "N/A", role: "N/A", joinedDate: "N/A", vehicle: "N/A" },
        { staffId: "N/A", name: "N/A", gender: "N/A", designation: "N/A", role: "N/A", joinedDate: "N/A", vehicle: "N/A" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSave = () => {
        if (staffData.firstName && staffData.lastName && staffData.role !== "Choose Role" && staffData.gender !== "Choose Gender") {
            const newStaffMember = {
                staffId: staffData.staffId || "N/A",
                name: `${staffData.firstName} ${staffData.lastName}`,
                gender: staffData.gender,
                designation: staffData.designation,
                role: staffData.role,
                joinedDate: staffData.joinedDate,
                vehicle: staffData.vehicle,
            };
            setStaffMembers([newStaffMember, ...staffMembers]);
            clearFields();
            alert("Staff member saved successfully!");
        } else {
            alert("Please fill out all required fields correctly.");
        }
    };

    const handleUpdate = () => {
        if (staffData.staffId) {
            const updatedStaffMembers = staffMembers.map(member =>
                member.staffId === staffData.staffId ? {
                    staffId: staffData.staffId,
                    name: `${staffData.firstName} ${staffData.lastName}`,
                    gender: staffData.gender,
                    designation: staffData.designation,
                    role: staffData.role,
                    joinedDate: staffData.joinedDate,
                    vehicle: staffData.vehicle,
                } : member
            );
            setStaffMembers(updatedStaffMembers);
            clearFields();
            alert("Staff member updated successfully!");
        } else {
            alert("Please provide a valid Staff ID to update.");
        }
    };

    const handleDelete = () => {
        if (staffData.staffId) {
            const filteredStaffMembers = staffMembers.filter(member => member.staffId !== staffData.staffId);
            setStaffMembers(filteredStaffMembers);
            clearFields();
            alert("Staff member deleted successfully!");
        } else {
            alert("Please provide a valid Staff ID to delete.");
        }
    };

    const clearFields = () => {
        setStaffData({
            firstName: "",
            lastName: "",
            role: "Choose Role",
            gender: "Choose Gender",
            vehicle: "",
            designation: "",
            address1: "",
            address2: "",
            address3: "",
            address4: "",
            address5: "",
            joinedDate: "",
            dob: "",
            contactNumber: "",
            email: "",
            staffId: "",
        });
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedStaffMembers = [...staffMembers].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setStaffMembers(sortedStaffMembers);
    };

    const paginatedStaffMembers = staffMembers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const totalPages = Math.ceil(staffMembers.length / rowsPerPage);

    return (
        <section>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.firstName}
                            onChange={(e) => setStaffData({...staffData, firstName: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={staffData.lastName}
                        onChange={(e) => setStaffData({...staffData, lastName: e.target.value})}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label className="form-label">Gender</label>
                    <select
                        className="form-select mb-3"
                        value={staffData.gender}
                        onChange={(e) => setStaffData({...staffData, gender: e.target.value})}
                    >
                        <option>Choose Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        value={staffData.role}
                        onChange={(e) => setStaffData({...staffData, role: e.target.value})}
                    >
                        <option>Choose Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="SCIENTIST">SCIENTIST</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Vehicle</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.vehicle}
                            onChange={(e) => setStaffData({...staffData, vehicle: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Designation</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.designation}
                            onChange={(e) => setStaffData({...staffData, designation: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            value={staffData.dob}
                            onChange={(e) => setStaffData({...staffData, dob: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Joined Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={staffData.joinedDate}
                            onChange={(e) => setStaffData({...staffData, joinedDate: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.contactNumber}
                            onChange={(e) => setStaffData({...staffData, contactNumber: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={staffData.email}
                            onChange={(e) => setStaffData({...staffData, email: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Address Line 1</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.address1}
                            onChange={(e) => setStaffData({...staffData, address1: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Address Line 2</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.address2}
                            onChange={(e) => setStaffData({...staffData, address2: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Address Line 3</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.address3}
                            onChange={(e) => setStaffData({...staffData, address3: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Address Line 4</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.address4}
                            onChange={(e) => setStaffData({...staffData, address4: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Address Line 5</label>
                        <input
                            type="text"
                            className="form-control"
                            value={staffData.address5}
                            onChange={(e) => setStaffData({...staffData, address5: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="StaffIdField" className="form-label">Staff ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="StaffIdField"
                            placeholder="Only add for delete and update"
                            value={staffData.staffId}
                            onChange={(e) => setStaffData({...staffData, staffId: e.target.value})}
                        />
                    </div>
                </div>
            </div>


            <div className="btn-group mb-5 mt-4" role="group">
                <button type="button" className="btn btn-warning" onClick={handleSave}>Save</button>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>Update</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={clearFields}>Clear</button>
            </div>

            <table className="table table-striped" style={{width: "100%"}}>
                <thead>
                <tr>
                    <th onClick={() => handleSort("staffId")}>Staff ID</th>
                    <th onClick={() => handleSort("name")}>Name</th>
                    <th onClick={() => handleSort("gender")}>Gender</th>
                    <th onClick={() => handleSort("designation")}>Designation</th>
                    <th onClick={() => handleSort("role")}>Role</th>
                    <th onClick={() => handleSort("joinedDate")}>Joined Date</th>
                    <th onClick={() => handleSort("vehicle")}>Vehicle</th>
                </tr>
                </thead>
                <tbody>
                {paginatedStaffMembers.map((member, index) => (
                    <tr key={index}>
                        <td>{member.staffId}</td>
                        <td>{member.name}</td>
                        <td>{member.gender}</td>
                        <td>{member.designation}</td>
                        <td>{member.role}</td>
                        <td>{member.joinedDate}</td>
                        <td>{member.vehicle}</td>
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

export default StaffPage;
