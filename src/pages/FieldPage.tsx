import { useState } from "react";

const FieldPage = () => {
    const [fieldData, setFieldData] = useState({
        fieldName: "",
        fieldLocation: "",
        extentSize: "",
        fieldImage1: null,
        fieldImage2: null,
        fieldId: "",
    });

    const [fieldList, setFieldList] = useState([
        {
            fieldId: "F001",
            fieldName: "North Field",
            fieldLocation: "Location 1",
            extentSize: "15",
            fieldImage1: "image1.jpg",
            fieldImage2: "image2.jpg",
        },
        {
            fieldId: "F002",
            fieldName: "South Field",
            fieldLocation: "Location 2",
            extentSize: "20",
            fieldImage1: "image3.jpg",
            fieldImage2: "image4.jpg",
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSave = () => {
        if (
            fieldData.fieldName &&
            fieldData.fieldLocation &&
            fieldData.extentSize
        ) {
            const newField = {
                fieldId: fieldData.fieldId || `F${Date.now()}`,
                fieldName: fieldData.fieldName,
                fieldLocation: fieldData.fieldLocation,
                extentSize: fieldData.extentSize,
                fieldImage1: fieldData.fieldImage1 || "N/A",
                fieldImage2: fieldData.fieldImage2 || "N/A",
            };
            setFieldList([newField, ...fieldList]);
            clearFields();
            alert("Field saved successfully!");
        } else {
            alert("Please fill out all required fields.");
        }
    };

    const handleUpdate = () => {
        if (fieldData.fieldId) {
            const updatedFieldList = fieldList.map((field) =>
                field.fieldId === fieldData.fieldId ? { ...fieldData } : field
            );
            setFieldList(updatedFieldList);
            clearFields();
            alert("Field updated successfully!");
        } else {
            alert("Please provide a valid Field ID to update.");
        }
    };

    const handleDelete = () => {
        if (fieldData.fieldId) {
            const filteredFieldList = fieldList.filter(
                (field) => field.fieldId !== fieldData.fieldId
            );
            setFieldList(filteredFieldList);
            clearFields();
            alert("Field deleted successfully!");
        } else {
            alert("Please provide a valid Field ID to delete.");
        }
    };

    const clearFields = () => {
        setFieldData({
            fieldName: "",
            fieldLocation: "",
            extentSize: "",
            fieldImage1: null,
            fieldImage2: null,
            fieldId: "",
        });
    };

    const handleSort = (key) => {
        const direction = sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });

        const sortedList = [...fieldList].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setFieldList(sortedList);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = fieldList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section id="FieldSection">
            <div className="mb-3">
                <label htmlFor="FieldNameField" className="form-label">
                    Field Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="FieldNameField"
                    value={fieldData.fieldName}
                    onChange={(e) => setFieldData({ ...fieldData, fieldName: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="FieldLocationField" className="form-label">
                    Field Location
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="FieldLocationField"
                    value={fieldData.fieldLocation}
                    onChange={(e) => setFieldData({ ...fieldData, fieldLocation: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="extentSizeField" className="form-label">
                    Extent Size Of The Field (km<sup>2</sup>)
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="extentSizeField"
                    value={fieldData.extentSize}
                    onChange={(e) => setFieldData({ ...fieldData, extentSize: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="fieldImage1" className="form-label">
                    Add Field Image 1
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="fieldImage1"
                    onChange={(e) => setFieldData({ ...fieldData, fieldImage1: e.target.files[0]?.name })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="fieldImage2" className="form-label">
                    Add Field Image 2
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="fieldImage2"
                    onChange={(e) => setFieldData({ ...fieldData, fieldImage2: e.target.files[0]?.name })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="FieldIdField" className="form-label">
                    Field ID
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="FieldIdField"
                    value={fieldData.fieldId}
                    onChange={(e) => setFieldData({ ...fieldData, fieldId: e.target.value })}
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
                    <th onClick={() => handleSort("fieldId")}>Field ID</th>
                    <th onClick={() => handleSort("fieldName")}>Field Name</th>
                    <th onClick={() => handleSort("fieldLocation")}>Field Location</th>
                    <th onClick={() => handleSort("extentSize")}>Extent Size (km²)</th>
                    <th>Field Image 1</th>
                    <th>Field Image 2</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((field, index) => (
                    <tr key={index}>
                        <td>{field.fieldId}</td>
                        <td>{field.fieldName}</td>
                        <td>{field.fieldLocation}</td>
                        <td>{field.extentSize}</td>
                        <td>{field.fieldImage1}</td>
                        <td>{field.fieldImage2}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th>Field ID</th>
                    <th>Field Name</th>
                    <th>Field Location</th>
                    <th>Extent Size (km²)</th>
                    <th>Field Image 1</th>
                    <th>Field Image 2</th>
                </tr>
                </tfoot>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(Math.ceil(fieldList.length / itemsPerPage))].map((_, index) => (
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

export default FieldPage;