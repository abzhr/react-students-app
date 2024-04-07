import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployeeNotes } from '../services/employeeService';

const StudentNotes = () => {
    const { id } = useParams();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchEmployeeNotes = async () => {
            try {
                const employeeNotes = await getEmployeeNotes(id);
                setNotes(employeeNotes);
            } catch (error) {
                console.error('Error fetching students notes:', error);
            }
        };

        fetchEmployeeNotes();
    }, [id]);

    return (
        <div className="container text-center"> {/* Added text-center class to center content */}
            <h2>Student Notes</h2>
            <table className="table mx-auto"> {/* Added mx-auto class to center table horizontally */}
                <thead>
                    <tr>
                        <th>Note</th>
                        <th>Subject</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note, index) => (
                        <tr key={index}>
                            <td>{note.note}</td>
                            <td>{note.subject}</td>
                            <td>{note.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="btn btn-danger" to="/">Back to Listing</Link>
        </div>
    );
};

export default StudentNotes;
