// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Home from './Home.jsx';
import Update from './Update.jsx';
import Signup from './Pages/Signup.jsx'; 
import Login from './Pages/Login'; 
import "./App.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<App />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </React.StrictMode>
    </BrowserRouter>
);
