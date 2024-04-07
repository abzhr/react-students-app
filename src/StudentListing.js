import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StudentListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/student/detail/" + id);
    };
    const LoadEdit = (id) => {
        navigate("/student/edit/" + id);
    };
    const Removefunction = (id) => {
        Swal.fire({
            title: 'Do you want to remove?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://localhost:8000/student/" + id, {
                    method: "DELETE"
                }).then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Removed successfully',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    window.location.reload();
                }).catch((err) => {
                    console.log(err.message);
                });
            }
        });
    };

    useEffect(() => {
        fetch("http://localhost:8000/student")
            .then((res) => res.json())
            .then((resp) => empdatachange(resp))
            .catch((err) => console.log(err.message));
    }, []);

    const handleAddNote = (id) => {
        navigate(`/student/${id}/add-note`);
    };

    const handleViewNotes = (id) => {
        navigate(`/student/${id}/notes`);
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h2 className="card-title">Students Listing</h2>
                </div>
                <div className="card-body">
                    <div className="text-right mb-3">
                        <Link to="student/create" className="btn btn-success">
                            Add New (+)
                        </Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empdata &&
                                    empdata.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <button
                                                    onClick={() => LoadEdit(item.id)}
                                                    className="btn btn-success mr-2 animate__animated animate__fadeIn"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => Removefunction(item.id)}
                                                    className="btn btn-danger mr-2 animate__animated animate__fadeIn"
                                                >
                                                    Remove
                                                </button>
                                                <button
                                                    onClick={() => LoadDetail(item.id)}
                                                    className="btn btn-primary mr-2 animate__animated animate__fadeIn"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => handleAddNote(item.id)}
                                                    className="btn btn-info mr-2 animate__animated animate__fadeIn"
                                                >
                                                    Add Note
                                                </button>
                                                <button
                                                    onClick={() => handleViewNotes(item.id)}
                                                    className="btn btn-info animate__animated animate__fadeIn"
                                                >
                                                    View Notes
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentListing;
