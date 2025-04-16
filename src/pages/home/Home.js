import 'primeicons/primeicons.css';
import './home.css';
import RequestsService from "../../services/requestsService";
import React, { useEffect, useState } from "react";
import taskTypes from '../../model/taskTypes';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const ENDPOINT = "";

function Home({ toastRef }) {
  const [tasks, setTasks] = useState(null);
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
                    await requestService.delete(task.id);
                    setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
                  } catch (error) {
                  }
                }} />
              </div>
            </div>
          )))
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Home;