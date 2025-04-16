import './taskeditor.css';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from "react";
import RequestsService from '../../services/requestsService';
import taskTypes from '../../model/taskTypes';
import Task from '../../model/task';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Link, useNavigate } from 'react-router-dom';

const ENDPOINT = "/create";

function TaskEditor({ toastRef }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  const types = Array.from(taskTypes.values());
  const [subjects, setSubjects] = useState(null);

  const requestService = new RequestsService(ENDPOINT);
  const navigate = useNavigate();

  useEffect(() => {
    async function readSubjects() {
      try {
        setSubjects(await requestService.get());
      } catch (err) {
        console.error(err);
      }
    }

    readSubjects();
  }, []);
  
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
            <InputText value={description} onChange={(e) => setDescription(e.target.value)} />
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
                      try {
                        await requestService.post(new Task(-1, getKeyByValue(taskTypes ,selectedType), subjects.indexOf(selectedSubject), description, date))
                        toastRef.current.show({severity:'success', summary: 'Task created', detail:'The task was successfully submitted.', life: 2000});
                        navigate("/");
                      } catch {
                        toastRef.current.show({severity:'error', summary: 'Submission failed', detail:'There was an error creating the task.', life: 2000}); 
                      }
                    } else {
                      toastRef.current.show({severity:'warn', summary: 'Invalid task', detail:'Fill in all fields.', life: 2000}); 
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

export default TaskEditor;