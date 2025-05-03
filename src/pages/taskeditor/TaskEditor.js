import './taskeditor.css';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect } from "react";
import RequestsService from '../../services/requestsService';
import taskTypes from '../../model/taskTypes';
import Task from '../../model/task';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Link, useNavigate } from 'react-router-dom';

export default function TaskEditor({ toastRef, subjects, editingTask, setEditingTask }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  const types = Array.from(taskTypes.values());

  const navigate = useNavigate();

  useEffect(() => {
    if(editingTask) {
      if(typeof editingTask.date === "string") {
        editingTask.date = new Date(editingTask.date.replace(/-/g, '/'));
      }

      setSelectedType(taskTypes.get(editingTask.typeId));
      setSelectedSubject(subjects[editingTask.subjectId-1]);
      setDescription(editingTask.description);
      setDate(editingTask.date);
    } else if(window.location.pathname === "/edit") {
        navigate("/");
        return;
    }
  }, [editingTask, navigate, subjects]);
  
  return (
    <>
      <div className="title-container">
        <Link to="/">
          <Button className="back-button" label="Back" icon="pi pi-chevron-left" raised />
        </Link>
        <label className="title">Create new task</label>
      </div>
      {!subjects ? (
        <p>Loading...</p>
      ) : (
      <>
        <div className="inputs">
          <FloatLabel>
            <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="name"
                      placeholder="Select Type" checkmark={true} highlightOnSelect={true} />
            <label htmlFor="dd-city">Type</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown value={selectedSubject} onChange={(e) => setSelectedSubject(e.value)} options={subjects} optionLabel="name"
                      placeholder="Select Subject" checkmark={true} highlightOnSelect={true} />
            <label htmlFor="dd-city">Subject</label>
          </FloatLabel>
          <FloatLabel>
            <InputText value={description} onChange={(e) => {
              if(e.target.value.length > 63) {
                e.target.value = e.target.value.substring(0, 64)
              }
              setDescription(e.target.value);
            }}/>
            <label htmlFor="description">Description</label>
          </FloatLabel>
          <FloatLabel>
            <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy"/>
            <label htmlFor="dd-city">Date</label>
          </FloatLabel>
        </div>

        <div className="submit-button-container">
          <Button className="submit-button" type="button" icon="pi pi-plus" label="Submit"
                  onClick={async () => {
                    if(selectedType && selectedSubject && description && date) {
                      if(!editingTask) {
                        try { // create
                          if(await RequestsService.post("/create", new Task(-1, getKeyByValue(taskTypes, selectedType), subjects.indexOf(selectedSubject) + 1, description, date))) {
                            // status 2XX
                            toastRef.current.show({severity:'success', summary: 'Task created', detail:'The task was successfully submitted.', life: 3000});
                            navigate("/");
                          } else { // status 5XX
                            toastRef.current.show({severity:'error', summary: 'Submission failed', detail:'There was an server error. Try again later.', life: 3000});
                          }
                        } catch { // other front errors
                          toastRef.current.show({severity:'error', summary: 'Submission failed', detail:'There was an error creating the task.', life: 3000}); 
                        }
                      } else { // update
                        let newTask = new Task(editingTask.id, getKeyByValue(taskTypes, selectedType), subjects.indexOf(selectedSubject) + 1, description, date);

                        if(JSON.stringify(newTask) === JSON.stringify(editingTask)) { // check if any change has been made
                          toastRef.current.show({severity:'warn', summary: 'Invalid task', detail:'Change at least one field.', life: 3000}); 
                        } else {
                          try {
                            if(await RequestsService.put("/edit/" + newTask.id, newTask)) {
                              // status 2XX
                              toastRef.current.show({severity:'success', summary: 'Task updated', detail:'The task was successfully updated.', life: 3000});
                              navigate("/");
                              setEditingTask(null);
                            } else { // status 5XX
                              toastRef.current.show({severity:'error', summary: 'Submission failed', detail:'There was an server error. Try again later.', life: 3000});
                            }
                          } catch { // other front errors
                            toastRef.current.show({severity:'error', summary: 'Submission failed', detail:'There was an error updating the task.', life: 3000}); 
                          }
                        }
                      }
                    } else { // warn if any of the fields are empty
                      toastRef.current.show({severity:'warn', summary: 'Invalid task', detail:'Fill in all fields.', life: 3000}); 
                    }
          }} />
        </div>
      </>)}
    </>);
}

function getKeyByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}