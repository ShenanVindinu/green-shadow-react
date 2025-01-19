import { useState } from "react";

const CropPage = () => {
    const [cropData, setCropData] = useState({
        cropCommonName: "",
        cropScientificName: "",
        cropCategory: "",
        cropSeason: "",
        cropFieldId: "",
        cropId: "",
        cropImage: null,
    });

    const [cropList, setCropList] = useState([
        {
            cropId: "1",
            cropCommonName: "Wheat",
            cropScientificName: "Triticum aestivum",
            cropCategory: "Cereal",
            cropSeason: "Winter",
            cropFieldId: "F001",
            cropImage: null,
        },
        {
            cropId: "2",
            cropCommonName: "Rice",
            cropScientificName: "Oryza sativa",
            cropCategory: "Cereal",
            cropSeason: "Summer",
            cropFieldId: "F002",
            cropImage: null,
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSave = () => {
        if (
            cropData.cropCommonName &&
            cropData.cropScientificName &&
            cropData.cropCategory &&
            cropData.cropSeason
        ) {
            const newCrop = {
                cropId: cropData.cropId || `C${Date.now()}`,
                cropCommonName: cropData.cropCommonName,
                cropScientificName: cropData.cropScientificName,
                cropCategory: cropData.cropCategory,
                cropSeason: cropData.cropSeason,
                cropFieldId: cropData.cropFieldId || "N/A",
                cropImage: cropData.cropImage,
            };
            setCropList([newCrop, ...cropList]);
            clearFields();
            alert("Crop saved successfully!");
        } else {
            alert("Please fill out all required fields.");
        }
    };

    const handleUpdate = () => {
        if (cropData.cropId) {
            const updatedCropList = cropList.map((item) =>
                item.cropId === cropData.cropId ? { ...cropData } : item
            );
            setCropList(updatedCropList);
            clearFields();
            alert("Crop updated successfully!");
        } else {
            alert("Please provide a valid Crop ID to update.");
        }
    };

    const handleDelete = () => {
        if (cropData.cropId) {
            const filteredCropList = cropList.filter(
                (item) => item.cropId !== cropData.cropId
            );
            setCropList(filteredCropList);
            clearFields();
            alert("Crop deleted successfully!");
        } else {
            alert("Please provide a valid Crop ID to delete.");
        }
    };

    const clearFields = () => {
        setCropData({
            cropCommonName: "",
            cropScientificName: "",
            cropCategory: "",
            cropSeason: "",
            cropFieldId: "",
            cropId: "",
            cropImage: null,
        });
    };

    const handleSort = (key) => {
        const direction = sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });

        const sortedList = [...cropList].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setCropList(sortedList);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cropList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleImageChange = (e) => {
        setCropData({ ...cropData, cropImage: e.target.files[0] });
    };

    return (
        <section id="cropSection">
            <div className="mb-3">
                <label htmlFor="CropCommonNameField" className="form-label">
                    Crop Common Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="CropCommonNameField"
                    value={cropData.cropCommonName}
                    onChange={(e) => setCropData({ ...cropData, cropCommonName: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="CropCommonScientificNameField" className="form-label">
                    Crop Common Scientific Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="CropCommonScientificNameField"
                    value={cropData.cropScientificName}
                    onChange={(e) => setCropData({ ...cropData, cropScientificName: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="CropCategoryField" className="form-label">
                    Crop Category
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="CropCategoryField"
                    value={cropData.cropCategory}
                    onChange={(e) => setCropData({ ...cropData, cropCategory: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="CropImage" className="form-label">
                    Crop Image
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="CropImage"
                    onChange={handleImageChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="CropSeasonField" className="form-label">
                    Crop Season
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="CropSeasonField"
                    value={cropData.cropSeason}
                    onChange={(e) => setCropData({ ...cropData, cropSeason: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="CropFieldIdField" className="form-label">
                    Assign Crop Field Id
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="CropFieldIdField"
                    value={cropData.cropFieldId}
                    onChange={(e) => setCropData({ ...cropData, cropFieldId: e.target.value })}
                    placeholder="Optional"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cropIdField" className="form-label">
                    Crop ID
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cropIdField"
                    value={cropData.cropId}
                    onChange={(e) => setCropData({ ...cropData, cropId: e.target.value })}
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
                    <th onClick={() => handleSort("cropId")}>Crop ID</th>
                    <th onClick={() => handleSort("cropCommonName")}>Crop Common Name</th>
                    <th onClick={() => handleSort("cropScientificName")}>Crop Scientific Name</th>
                    <th onClick={() => handleSort("cropCategory")}>Crop Category</th>
                    <th>Crop Image</th>
                    <th onClick={() => handleSort("cropSeason")}>Crop Season</th>
                    <th onClick={() => handleSort("cropFieldId")}>Assigned Crop Field Id</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.cropId}</td>
                        <td>{item.cropCommonName}</td>
                        <td>{item.cropScientificName}</td>
                        <td>{item.cropCategory}</td>
                        <td>
                            {item.cropImage ? <img src={URL.createObjectURL(item.cropImage)} alt="crop" width="50" /> : "No Image"}
                        </td>
                        <td>{item.cropSeason}</td>
                        <td>{item.cropFieldId}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th>Crop ID</th>
                    <th>Crop Common Name</th>
                    <th>Crop Scientific Name</th>
                    <th>Crop Category</th>
                    <th>Crop Image</th>
                    <th>Crop Season</th>
                    <th>Assigned Crop Field Id</th>
                </tr>
                </tfoot>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(Math.ceil(cropList.length / itemsPerPage))].map((_, index) => (
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

export default CropPage;