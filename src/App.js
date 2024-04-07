import React, { createContext, useContext, useState } from 'react';
//import { BrowserRouter, Route, Routes, Navigate,Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import StudentListing from './StudentListing';
import StudentCreate from './StudentCreate';
import StudentDetail from './StudentDetail';
import StudentEdit from './StudentEdit';
import Login from './login/login';
import AddNote from './notes/AddNotes';
import StudentNotes from './notes/StudentNotes';
import PrivateRoutes from './utils/PrivateRoutes';



function App() {
  const [token, setToken] = useState(true);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<StudentListing />} path="/" exact />
            <Route element={<StudentCreate />} path="/student/create" exact />
            <Route path="/student/detail/:empid" element={<StudentDetail />} exact />
            <Route path="/student/edit/:empid" element={<StudentEdit />} />
            <Route path="/student/:id/add-note" element={<AddNote />} />
            <Route path="/student/:id/notes" element={<StudentNotes />} />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
