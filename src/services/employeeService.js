export const addEmployeeNote = async (employeeId, newNoteData) => {
    try {
        // Fetch current student data
        const response = await fetch(`http://localhost:8000/student/${employeeId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student data.');
        }
        const employeeData = await response.json();

        // Merge new notes with existing notes
        const updatedEmployeeData = {
            ...employeeData,
            notes: [...employeeData.notes, newNoteData]
        };

        // Update student data on the server
        const updateResponse = await fetch(`http://localhost:8000/student/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmployeeData)
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update student notes.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update student notes.');
    }
};


// employeeService.js
export const getEmployeeNotes = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/student/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student notes.');
        }
        const student = await response.json();
        return student.notes;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch student notes.');
    }
};
