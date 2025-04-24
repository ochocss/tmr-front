import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import TaskEditor from './pages/taskeditor/TaskEditor';
import RequestsService from './services/requestsService';

export default function App() {
  const toast = useRef(null);
  const [subjects, setSubjects] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    async function readSubjects() {
      try {
        setSubjects(await RequestsService.get("/subjects"));
      } catch (err) {
        console.error(err);
      }
    }

    readSubjects();
  }, []);

  return (
  <>
    <BrowserRouter>
      <Toast ref={toast} position='bottom-right' />
      <Routes>
        <Route path="/" element={<Home toastRef={toast} subjects={subjects} setEditingTask={setEditingTask} />} />
        <Route path="/create" element={<TaskEditor toastRef={toast} subjects={subjects} />} />
        <Route path="/edit" element={<TaskEditor toastRef={toast} subjects={subjects} editingTask={editingTask} setEditingTask={setEditingTask} />} />
      </Routes>
    </BrowserRouter>
    <div style={{display: "flex", justifyContent: "center", width: "100%", position: "relative", bottom: "0"}}>
      <p style={{opacity: "0.8"}}>
        Made by  
        <span style={{color: "rgb(112, 131, 233)", cursor: "pointer"}} onClick={() => window.location.href = "https://github.com/ochocss"}> chocs </span>
      </p>
    </div>
  </>
  )
}
