import './Home.css';
import RequestsService from "../../services/requestsService";
import React, { useEffect, useState } from "react";
import { taskTypes } from '../../model/taskTypes';

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
    <div>
      <h1>Task List</h1>
      {tasks ? (tasks.length === 0 ? (
        <p>No tasks created.</p>
      ) : (tasks.map(element => (
        <>
          <div key={element.id} id={element.id} style={{border:"3px solid black"}}>
            <div className="lefttaskcontainer">
              <p><strong>Type: </strong> {element.typeId}</p>
              <p><strong>Subject: </strong> {taskTypes.get(element.subjectId)}</p>
              <p><strong>Description: </strong> {element.description}</p>
              <p><strong>Date: </strong> {element.date}</p>
              <p><strong>Days left: </strong> {Math.abs(new Date() - new Date(element.date)) / (1000 * 60 * 60 * 24)}</p>
            </div>
            <div className="righttaskcontainer">
              <button className="deletebutton" type="button" onClick={async () => {
                await requestService.delete(element.id);
                document.getElementById(element.id).remove();
              }}>Delete</button>
              <button className="editbutton" type="button" onClick={() => {
                
              }}>Edit</button>
            </div>
          </div>
          <br />
        </>
      )))) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;