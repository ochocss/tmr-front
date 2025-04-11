import 'primereact/resources/themes/md-dark-deeppurple/theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import TaskEditor from './pages/taskeditor/TaskEditor'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<TaskEditor />} />
      </Routes>
    </BrowserRouter>
    <div style={{display: "flex", justifyContent: "center", width: "100%", position: "relative", bottom: "0"}}>
      <p style={{opacity: "0.8"}}>
        Made by  
        <span style={{color: "rgb(112, 131, 233)", cursor: "pointer"}} onClick={() => window.location.href = "https://github.com/ochocss"}> chocs </span>
      </p>
    </div>
  </>
);
