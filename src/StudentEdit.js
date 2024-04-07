import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const StudentEdit = () => {
    const { empid } = useParams();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/student/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                setId(resp.id);
                setName(resp.name);
                setEmail(resp.email);
                setPhone(resp.phone);
                setActive(resp.isactive);
                setNotes(resp.notes || []);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [empid]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [active, setActive] = useState(true);
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const empData = { id, name, email, phone, active, notes };

        fetch("http://localhost:8000/student/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empData)
        })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Updated',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2> Edit </h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={() => setValidation(true)} onChange={(e) => setName(e.target.value)} className="form-control" />
                                            {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input checked={active} onChange={(e) => setActive(e.target.checked)} type="checkbox" className="form-check-input" />
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentEdit;
