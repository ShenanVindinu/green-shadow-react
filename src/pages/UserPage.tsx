import { useState } from "react";

const UserPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Choose Role");
    const [users, setUsers] = useState([
        { email: "example1@gmail.com", role: "ADMIN" },
        { email: "example2@gmail.com", role: "MANAGER" },
        { email: "example3@gmail.com", role: "SCIENTIST" },
        { email: "example4@gmail.com", role: "OTHER" },
        { email: "example5@gmail.com", role: "ADMIN" },
        { email: "example6@gmail.com", role: "MANAGER" },
        { email: "example7@gmail.com", role: "SCIENTIST" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleUpdateUserDetails = () => {
        if (email && role !== "Choose Role") {
            const updatedUsers = [...users];
            updatedUsers[0] = { email, role }; // Update the first row as an example
            setUsers(updatedUsers);
            alert("User details updated successfully!");
        } else {
            alert("Please fill out all fields correctly.");
        }
    };

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(users.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Sorting logic
    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });

        setUsers(sortedUsers);
        setSortConfig({ key, direction });
    };

    return (
        <section>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="col">
                <label className="form-label">Role</label>
                <select
                    className="form-select"
                    aria-label="SetRole"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option>Choose Role</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="SCIENTIST">SCIENTIST</option>
                    <option value="OTHER">OTHER</option>
                </select>
            </div>

            <br />

            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-secondary mb-4"
                    onClick={handleUpdateUserDetails}
                >
                    Update User Details
                </button>
            </div>

            <table className="table table-striped" style={{ width: "100%" }}>
                <thead>
                <tr>
                    <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                        Email {sortConfig.key === "email" ? (sortConfig.direction === "ascending" ? "\u25B2" : "\u25BC") : ""}
                    </th>
                    <th onClick={() => handleSort("role")} style={{ cursor: "pointer" }}>
                        Role {sortConfig.key === "role" ? (sortConfig.direction === "ascending" ? "\u25B2" : "\u25BC") : ""}
                    </th>
                </tr>
                </thead>
                <tbody>
                {currentRows.map((user, index) => (
                    <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                >
                    Previous
                </button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default UserPage;