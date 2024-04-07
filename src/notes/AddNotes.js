import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addEmployeeNote } from '../services/employeeService'; // Import the employeeNoteService

const AddNote = () => {
    const [note, setNote] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID from the URL

    // List of subjects
    const subjectList = ['Math', 'Uml', 'Linux and bash scription'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the addEmployeeNote function from the employeeNoteService
            await addEmployeeNote(id, { // Pass the ID to the addEmployeeNote function
                note: parseFloat(note),
                subject,
                description
            });

            Swal.fire({
                icon: 'success',
                title: 'Note added successfully!',
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/student'); 
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add note.',
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="note">Note (between 0 and 20):</label>
                    <input
                        type="number"
                        className="form-control"
                        id="note"
                        min="0"
                        max="20"
                        step="0.1"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <select
                        className="form-control"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    >
                        <option value="">Select a subject</option>
                        {/* Mapping over the subject list to generate options */}
                        {subjectList.map((subj, index) => (
                            <option key={index} value={subj}>{subj}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <Link to="/" className="btn btn-secondary">Return</Link>
                </div>
            </form>
        </div>
    );
};

export default AddNote;
