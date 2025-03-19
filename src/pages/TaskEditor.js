import { FloatLabel } from 'primereact/floatlabel';

const ENDPOINT = "";

function TaskEditor() {
  return (
    <div>
      <div>
        <FloatLabel>
            <InputText id="name" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="name">Username</label>
        </FloatLabel>
      </div>
    </div>);
}

export default TaskEditor;