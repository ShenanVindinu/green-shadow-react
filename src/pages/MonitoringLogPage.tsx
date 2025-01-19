import { useState } from "react";

const MonitoringLogPage = () => {
    const [logData, setLogData] = useState({
        monitoringLogDate: "",
        monitoringLogDetails: "",
        monitoringLogFieldId: "",
        monitoringLogStaffId: "",
        monitoringLogId: "",
    });

    const [logList, setLogList] = useState([
        {
            logId: "1",
            monitoringLogDate: "2025-01-15",
            monitoringLogDetails: "Initial crop monitoring",
            monitoringLogFieldId: "F001",
            monitoringLogStaffId: "S001",
        },
        {
            logId: "2",
            monitoringLogDate: "2025-01-18",
            monitoringLogDetails: "Mid-season checkup",
            monitoringLogFieldId: "F002",
            monitoringLogStaffId: "S002",
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSave = () => {
        if (
            logData.monitoringLogDate &&
            logData.monitoringLogDetails
        ) {
            const newLog = {
                logId: logData.monitoringLogId || `L${Date.now()}`,
                monitoringLogDate: logData.monitoringLogDate,
                monitoringLogDetails: logData.monitoringLogDetails,
                monitoringLogFieldId: logData.monitoringLogFieldId || "N/A",
                monitoringLogStaffId: logData.monitoringLogStaffId || "N/A",
            };
            setLogList([newLog, ...logList]);
            clearFields();
            alert("Log saved successfully!");
        } else {
            alert("Please fill out all required fields.");
        }
    };

    const handleUpdate = () => {
        if (logData.monitoringLogId) {
            const updatedLogList = logList.map((log) =>
                log.logId === logData.monitoringLogId ? { ...logData } : log
            );
            setLogList(updatedLogList);
            clearFields();
            alert("Log updated successfully!");
        } else {
            alert("Please provide a valid Log ID to update.");
        }
    };

    const handleDelete = () => {
        if (logData.monitoringLogId) {
            const filteredLogList = logList.filter(
                (log) => log.logId !== logData.monitoringLogId
            );
            setLogList(filteredLogList);
            clearFields();
            alert("Log deleted successfully!");
        } else {
            alert("Please provide a valid Log ID to delete.");
        }
    };

    const clearFields = () => {
        setLogData({
            monitoringLogDate: "",
            monitoringLogDetails: "",
            monitoringLogFieldId: "",
            monitoringLogStaffId: "",
            monitoringLogId: "",
        });
    };

    const handleSort = (key) => {
        const direction = sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });

        const sortedList = [...logList].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setLogList(sortedList);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = logList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section id="monitoringLogSection">
            <div className="mb-3">
                <label htmlFor="MonitoringLogDateField" className="form-label">
                    MonitoringLog Date
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="MonitoringLogDateField"
                    value={logData.monitoringLogDate}
                    onChange={(e) => setLogData({ ...logData, monitoringLogDate: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="MonitoringLogDetailsField" className="form-label">
                    Monitoring Log Details
                </label>
                <textarea
                    className="form-control"
                    id="MonitoringLogDetailsField"
                    rows="3"
                    value={logData.monitoringLogDetails}
                    onChange={(e) => setLogData({ ...logData, monitoringLogDetails: e.target.value })}
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="MonitoringLogFieldIdField" className="form-label">
                    Monitoring Log Field Id
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="MonitoringLogFieldIdField"
                    value={logData.monitoringLogFieldId}
                    onChange={(e) => setLogData({ ...logData, monitoringLogFieldId: e.target.value })}
                    placeholder="Optional"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="MonitoringLogStaffId" className="form-label">
                    Monitoring Log Staff Id
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="MonitoringLogStaffId"
                    value={logData.monitoringLogStaffId}
                    onChange={(e) => setLogData({ ...logData, monitoringLogStaffId: e.target.value })}
                    placeholder="Optional"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="monitoringLogIdField" className="form-label">
                    Log ID
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="monitoringLogIdField"
                    value={logData.monitoringLogId}
                    onChange={(e) => setLogData({ ...logData, monitoringLogId: e.target.value })}
                    placeholder="Only add for delete and update"
                />
            </div>

            <div className="btn-group mb-5 mt-4" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-warning" onClick={handleSave}>
                    Save
                </button>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                    Update
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
                <button type="button" className="btn btn-primary" onClick={clearFields}>
                    Clear
                </button>
            </div>

            <table className="table table-striped" style={{ width: "100%" }}>
                <thead>
                <tr>
                    <th onClick={() => handleSort("logId")}>Log ID</th>
                    <th onClick={() => handleSort("monitoringLogDate")}>Monitoring Log Date</th>
                    <th onClick={() => handleSort("monitoringLogDetails")}>Monitoring Log Details</th>
                    <th onClick={() => handleSort("monitoringLogFieldId")}>Monitoring Log Field</th>
                    <th onClick={() => handleSort("monitoringLogStaffId")}>Monitoring Log Staff</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.logId}</td>
                        <td>{item.monitoringLogDate}</td>
                        <td>{item.monitoringLogDetails}</td>
                        <td>{item.monitoringLogFieldId}</td>
                        <td>{item.monitoringLogStaffId}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th>Log ID</th>
                    <th>Monitoring Log Date</th>
                    <th>Monitoring Log Details</th>
                    <th>Monitoring Log Field</th>
                    <th>Monitoring Log Staff</th>
                </tr>
                </tfoot>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(Math.ceil(logList.length / itemsPerPage))].map((_, index) => (
                        <li className="page-item" key={index}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
};

export default MonitoringLogPage;