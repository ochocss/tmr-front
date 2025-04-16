import 'primeicons/primeicons.css';
import './home.css';
import RequestsService from "../../services/requestsService";
import React, { useEffect, useState } from "react";
import taskTypes from '../../model/taskTypes';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

const ENDPOINT = "";

function Home({ toastRef }) {
  const [tasks, setTasks] = useState(null);
  const [visible, setVisible] = useState(false);

  const requestService = new RequestsService(ENDPOINT);

  useEffect(() => {
    async function readTasks() {
      try {
        setTasks(await requestService.get());
      } catch (err) {
        console.error(err);
      }
    }

    readTasks();
  }, []);
  
  return (
    <>
      <div className="centralize">
        <h1>Task List</h1>
      </div>
      {tasks ? (
        <>
          <Link to="/create">
            <Button className="create-button" label="Create task" icon="pi pi-plus" raised />
          </Link>
          
          {(tasks.length === 0 ? (
            <p>No tasks created.</p>
          ) : (tasks.map(task => (
            <div className="task" key={task.id} id={task.id}>
              <div>
                <p><strong>Type: </strong> {taskTypes.get(task.typeId)}</p>
                <p><strong>Subject: </strong> {/* TODO: juntar setsubject das 2 pag na App e passar por props */} </p> 
                <p><strong>Description: </strong> {task.description}</p>
                <p><strong>Date: </strong> {task.date}</p>
                <p><strong>Days left: </strong> {((new Date(task.date) - new Date()) / (1000 * 60 * 60 * 24)).toFixed(0)} days</p>
              </div>
              <div className="buttons">
                <Link to="/edit"><Button className="edit-button" type="button" icon="pi pi-file-edit" label="Edit"
                  onClick={() => {
                  
                }} /></Link>
                <Button className="delete-button" type="button" icon="pi pi-trash" label="Delete"
                onClick={async () => {
                  try {
                    setVisible(true);
                  } catch (error) {
                    toastRef.current.show({severity:'error', summary: 'Deletion failed', detail:'There was an error deleting the task.', life: 2000}); 
                  }
                }} />
                <Dialog header="Are you sure you want to delete this task?" visible={visible} style={{ width: '50vw' }} 
                onHide={() => {if (!visible) return; setVisible(false); }} footer={
                  <>
                    <Button className="confirm-deletion-button" label="Yes" icon="pi pi-check" onClick={async () => {
                        setVisible(false);
                        await requestService.delete(task.id);
                        setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
                      }} />
                    <Button className="cancel-deletion-button" label="No" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus />
                  </>
                } />
              </div>
            </div>
          )))
          )}
        </>
      ) : (
        <div className="centralize">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem', margin: '20px' }}></i>
        </div>
      )}
    </>
  );
}

export default Home;