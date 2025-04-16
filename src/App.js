import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import TaskEditor from './pages/taskeditor/TaskEditor';

export default function App() {
  const toast = useRef(null);

  return (
  <>
    <BrowserRouter>
      <Toast ref={toast} position='bottom-right' />
      <Routes>
        <Route path="/" element={<Home toastRef={toast} />} />
        <Route path="/create" element={<TaskEditor toastRef={toast} />} />
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
