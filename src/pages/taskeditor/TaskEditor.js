import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from "react";
import RequestsService from '../../services/requestsService';

const ENDPOINT = "/";

function TaskEditor() {
  const [selectedSubjects, setSelectedSubjects] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [value, setValue] = useState(null);

  let requestService = new RequestsService(ENDPOINT);

  useEffect(() => {
      async function readSubjects() {
        try {
          setSubjects(); // TODO get 
        } catch (err) {
          console.error(err);
        }
      }
  
      readSubjects();
    }, []);

  return (
    <div>
      <div>
        {!subjects ? (
          <p>Loading...</p>
        ) : (
        <>
          <FloatLabel>
            <Dropdown value={selectedSubjects} onChange={(e) => setSelectedSubjects(e.value)} options={subjects} optionLabel="name"
                      placeholder="Select a Subject" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />
          </FloatLabel><FloatLabel>
            <InputText id="description" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="description">Description</label>
          </FloatLabel>
        </>)}
      </div>
    </div>);
}

export default TaskEditor;