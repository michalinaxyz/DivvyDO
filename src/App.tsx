import { FormEvent, useState } from "react";
import { useMultistepForm } from "./useMultistepForm";
import { ParticipantsForm } from "./forms/participants/ParticipantsForm";
import { TasksForm } from "./forms/tasks/TasksForm";
import Participant from "./model/Participant";
import "../index.css";
import Task from "./model/Task";
import divideTasks from "./controller/taskDivider";
import UnpredictableTask from "./model/UnpredictableTask";

const PARTICIPANTS: Participant[] = [
  new Participant("Piti"),
  new Participant("Gati"),
];
const TASKS: Task[] = [new UnpredictableTask("vacuuming")];
function App() {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [tasks, setTasks] = useState(TASKS);

  return (
    <div>
      {/* <ParticipantsForm
        initParticipants={participants}
        setParticipants={setParticipants}
      /> */}
      <TasksForm initTasks={tasks} setTasks={setTasks} />
      <button onClick={() => console.log(divideTasks(participants, tasks))}>
        Divide tasks
      </button>
    </div>
  );
}

export default App;
