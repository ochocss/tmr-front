import './taskeditor.css';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from "react";
import RequestsService from '../../services/requestsService';
import { taskTypes } from '../../model/taskTypes';
import { Task } from '../../model/task';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

const ENDPOINT = "/create";

function TaskEditor() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  const types = Array.from(taskTypes.values());
  const [subjects, setSubjects] = useState(null);

  const toast = useRef(null);
  const requestService = new RequestsService(ENDPOINT);

  useEffect(() => {
    async function readSubjects() {
      try {
        setSubjects(await requestService.get()); // TODO get 
      } catch (err) {
        console.error(err);
      }
    }

    readSubjects();
  }, []);
  
  return (
    <>
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
        <Button className="submit-button" type="button" icon="pi pi-plus" label="Submit"
                onClick={async () => {
                  selectedType && selectedSubject && description && date ? await requestService.post(new Task(-1, selectedType, selectedSubject, description, date)) :
                  toast.current.show({severity:'warn', summary: 'Invalid task', detail:'Fill in all fields.', life: 2000});
        }} />
        <Toast ref={toast} position='bottom-right'/>
      </>)}
    </>);
}

export default TaskEditor;