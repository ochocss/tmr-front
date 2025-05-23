import 'primeicons/primeicons.css';
import './Home.css';
import RequestsService from "../../services/requestsService";
import React, { useEffect, useState } from "react";
import taskTypes from '../../model/taskTypes';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

const ENDPOINT = "/home";

const taskColumns = ["Type", "Subject", "Date"];

export default function Home({ toastRef, subjects, setEditingTask }) {
  const [tasks, setTasks] = useState(null);
  const [visible, setVisible] = useState(false);

  const [order, setOrder] = useState("Date");

  useEffect(() => {
    async function readTasks() {
      try {
        setTasks(await RequestsService.get(ENDPOINT));
      } catch (err) {
        console.error(err);
      }
    }

    readTasks();
  }, []);
  
  useEffect(() => {
    if (tasks) {
      const sortedTasks = [...tasks].sort((a, b) => {
        switch (order) {
          case "Type": return compare(a.typeId, b.typeId);
          case "Subject": return compare(a.subjectId, b.subjectId);
          default: return compare(a.date, b.date);
        }
      });
      setTasks(sortedTasks);
    }
  }, [order]);

  return (
    <>
      <div className="centralize">
        <h1>Task List</h1>
      </div>
      {tasks && subjects ? (
        <>
          <div className="main-buttons">
            <Link to="/create">
              <Button className="create-button" label="Create new task" icon="pi pi-plus" raised />
            </Link>
            <FloatLabel>
              <Dropdown value={order} onChange={(e) => setOrder(e.value)} options={taskColumns} optionLabel="name"
                        placeholder="Select Type" checkmark={true} highlightOnSelect={true} />
              <label>Order by...</label>
            </FloatLabel>
          </div>
          
          {(tasks.length === 0 ? (
            <p className="no-task-p">No tasks created.</p>
          ) : (tasks.map(task => (
            <div className="task" key={task.id} id={task.id}>
              <div>
                <p><strong>Type: </strong> {taskTypes.get(task.typeId)}</p>
                <p><strong>Subject: </strong> {subjects[task.subjectId-1]} </p> 
                <p><strong>Description: </strong> {task.description}</p>
                <p><strong>Date: </strong> {task.date}</p>
                <p><strong>Days left: </strong> {((new Date(task.date) - new Date()) / (1000 * 60 * 60 * 24)).toFixed(0)} days</p>
              </div>
              <div className="buttons">
                <Link to="/edit"><Button className="edit-button" type="button" icon="pi pi-file-edit" label="Edit"
                  onClick={() => {
                    setEditingTask(task);
                }} /></Link>
                <Button className="delete-button" type="button" icon="pi pi-trash" label="Delete"
                onClick={async () => {
                  try {
                    setVisible(true);
                  } catch (error) {
                    toastRef.current.show({severity:'error', summary: 'Deletion failed', detail:'There was an error deleting the task.', life: 1500}); 
                  }
                }} />
                <Dialog header="Are you sure you want to delete this task?" visible={visible} style={{ width: '50vw' }} 
                onHide={() => {if (!visible) return; setVisible(false); }} footer={
                  <>
                    <Button className="confirm-deletion-button" label="Yes" icon="pi pi-check" onClick={async () => {
                        setVisible(false);
                        if(await RequestsService.delete(ENDPOINT, task.id)) {
                          toastRef.current.show({severity:'success', summary: 'Task deleted', detail:'The task was successfully deleted.', life: 1500});
                          setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
                        } else {
                          toastRef.current.show({severity:'error', summary: 'Deletion failed', detail:'There was an server error. Try again later.', life: 1500});
                        }
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

function compare(a, b) {
  if ( a < b ){
    return -1;
  }

  if ( a > b ){
    return 1;
  }

  return 0;
}