import 'primeicons/primeicons.css';
import './Home.css';
import RequestsService from "../../services/requestsService";
import React, { useEffect, useState, useId } from "react";
import { taskTypes } from '../../model/taskTypes';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const ENDPOINT = "";

function Home() {
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
          <Link to="/create"><Button className="create-button" label="Create task" icon="pi pi-plus"
              onClick={() => {
              
            }} /></Link>
          {(tasks.length === 0 ? (
            <p>No tasks created.</p>
          ) : (tasks.map(element => (
            <div className="task" key={element.id} id={element.id}>
              <div>
                <p><strong>Type: </strong> {element.typeId}</p>
                <p><strong>Subject: </strong> {taskTypes.get(element.subjectId)}</p>
                <p><strong>Description: </strong> {element.description}</p>
                <p><strong>Date: </strong> {element.date}</p>
                <p><strong>Days left: </strong> {Math.abs(new Date() - new Date(element.date)) / (1000 * 60 * 60 * 24)}</p>
              </div>
              <div className="buttons">
                <Link to="/edit"><Button className="edit-button" type="button" icon="pi pi-file-edit" label="Edit"
                  onClick={() => {
                  
                }} /></Link>
                <Button className="delete-button" type="button" icon="pi pi-trash" label="Delete"
                  onClick={async () => {
                  await requestService.delete(element.id);
                  document.getElementById(element.id).remove();
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