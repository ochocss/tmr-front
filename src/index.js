import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout'
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
    <Layout />
  </>
);
