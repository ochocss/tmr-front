import './App.css';
import RequestsService from "./services/requestsService";
import React, { useEffect, useState } from "react";

const ENDPOINT = "";

function App() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    async function fetchMessage() {
      try {
        setTasks(await new RequestsService(ENDPOINT).get());
      } catch (err) {
        console.error(err);
      }
    }

    fetchMessage();
  }, []);
  
  return (
    <div>
      <h1>Task List</h1>
      {tasks ? (tasks.length === 0 ? (
        <p>No tasks created.</p>
      ) : (tasks.map(element => (
        <>
          <div key={element.id} style={{border:"3px solid black"}}>
            <div class="lefttaskcontainer">
              <p><strong>Type: </strong> {element.typeId}</p>
              <p><strong>Subject: </strong> {element.subjectId}</p>
              <p><strong>Description: </strong> {element.description}</p>
              <p><strong>Date: </strong> {element.date}</p>
              <p><strong>Days left: </strong> {Math.abs(new Date() - new Date(element.date)) / (1000 * 60 * 60 * 24)}</p>
            </div>
            <div class="righttaskcontainer">
              <button className="button" type="button">Delete task</button>
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

export default App;