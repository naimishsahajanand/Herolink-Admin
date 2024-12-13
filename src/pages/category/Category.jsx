import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance, { authHeader } from "../../helper/axios";
import toast from "react-hot-toast";
import DeleteModal from "../../components/modal/delete/DeleteModal";
import AddCategory from "../../components/offcanvas/category/AddCategory";
import EditCategory from "../../components/offcanvas/category/EditCategory";

const Category = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [editData, setEditData] = useState({});
    const [detailData, setDetailData] = useState({});

    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [detailShow, setDetailShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const deleteText = "category";

    const handleClose = () => {
        setAddShow(false);
        setEditShow(false);
        setDeleteShow(false);
        setDetailShow(false);
    }


    const fetchCategoryData = async () => {
        setIsLoading(true);
        try {

            const data = await axiosInstance.get(`/admin/category/list`, authHeader());
            console.log("data", data?.data?.status);


            if (data?.data?.status === true) {
                setData(data?.data?.data);
                setIsLoading(false);
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const handleDelete = async () => {
        try {

            const data = await axiosInstance.delete(`/admin/category/delete/${deleteId}`, authHeader());
            if (data?.status === 200) {
                toast.success(data?.data?.message);
                fetchCategoryData();
                handleClose();
            } else {
                toast.error(data?.data?.message);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };



    const columns = [
        {
            name: 'ID',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '400px',
        },
        {
            name: 'Category',
            selector: row => row.name,
            width: '400px'

        },
        {
            name: 'Status',
            selector: row => <div className={`m-auto ${row.status === "active" ? "active" : "in-active"}`}>
                {row.status}
            </div>,
            width: '400px'
        },
        {
            name: 'Action',
            selector: row => (
                <div className="d-flex align-items-center">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                        <img src="/images/pencil-fill (1).png" alt="" onClick={() => {
                            setEditShow(true);
                            setEditData(row);
                        }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                        <img src="/images/delete-white.png" alt="" onClick={() => {
                            setDeleteShow(true);
                            setDeleteId(row.id);
                        }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                    </div>
                </div>
            )
        }
    ];
    // const customStyles = {
    //     rows: {
    //         style: {
    //             backgroundColor: "#000000",
    //             color: '#FFF',
    //             fontSize: '14px',
    //             // borderBottom: '1px solid #FFF',
    //         },
    //     },
    //     headRow: {
    //         style: {
    //             backgroundColor: "#000000",
    //             color: '#FFF',
    //             fontSize: '16px',
    //             // borderBottom: '1px solid #FFF',
    //         },
    //     },
    //     pagination: {
    //         style: {
    //             backgroundColor: "#000000",
    //             color: '#FFF',
    //         },
    //         pageButtonsStyle: {
    //             backgroundColor: "#ffffff",
    //             color: "#000000",
    //             border: "1px solid #ddd",
    //             borderRadius: "4px",
    //             padding: "5px 10px",
    //             margin: "0 5px",
    //             cursor: "pointer",
    //             '&:hover': {
    //                 backgroundColor: '#f1f1f1',
    //             },
    //             '&:disabled': {
    //                 backgroundColor: "#f8f8f8",
    //                 color: "#cccccc",
    //                 cursor: "not-allowed",
    //             },
    //         },
    //         icons: {
    //             previous: <img src="/icons/prev-white.png" alt="Previous" style={{ filter: 'invert(1)' }} />, // Custom white icon for "Previous"
    //             next: <img src="/icons/next-white.png" alt="Next" style={{ filter: 'invert(1)' }} />,       // Custom white icon for "Next"
    //         },
    //     },
    // };

    const customStyles = {
        table: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF'
            },
        },
        rows: {
            style: {
                backgroundColor: "#fff0 ",
                color: '#FFF',

            },
        },
        headRow: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF',
                fontSize: '14px',
                borderBottom: '1px solid #FFF',

            },
        },
        pagination: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF'
            },
        }
    }


    const filteredData = data?.filter((item) => {
        console.log("item", item);

        const searchStr = `${item.name} ${item?.role}`.toLowerCase();
        return searchStr.includes(filterText.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + perPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };
    if (error) return <h1>{error}</h1>;

    return (
        <>
            <section className="categorylist-section mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h4 className="mb-0 page-title">Category List</h4>
                                    <button className="add-btn" type="button" onClick={() => setAddShow(true)}>
                                        + Add New Category
                                    </button>
                                </div>
                            </div>
                            <div className="card-body table-responsive">
                                <div className="row mt-2 justify-content-between">
                                    <div className="col-md-auto ms-auto ">
                                        <div className="dt-search d-flex align-items-center gap-1">
                                            <label htmlFor="dt-search-0" className="search-label">Search:</label>
                                            <input
                                                type="search"
                                                className="form-control form-control-sm"
                                                id="dt-search-0"
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DataTable
                                        columns={columns}
                                        data={currentPageData}
                                        // progressPending={isLoading}
                                        progressComponent={<h1>Loading...</h1>}
                                        pagination
                                        paginationServer
                                        paginationTotalRows={filteredData.length}
                                        paginationPerPage={perPage}
                                        onChangeRowsPerPage={handleRowsPerPageChange}
                                        onChangePage={handlePageChange}
                                        // striped
                                        // theme={2 === 1 ? "dark" : "default"}
                                        customStyles={customStyles}
                                        theme="dark"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======= Data Add Offcanvas ======== */}
            <AddCategory show={addShow} fetchCategoryData={fetchCategoryData} handleClose={handleClose} />
            <EditCategory show={editShow} fetchCategoryData={fetchCategoryData} handleClose={handleClose} editData={editData} />
            <DeleteModal show={deleteShow} handleClose={handleClose} handleDelete={handleDelete} text={deleteText} />
        </>
    )
}
export default Category;


