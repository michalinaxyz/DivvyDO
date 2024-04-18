import { FormEvent, useState } from "react";
import { useMultistepForm } from "./useMultistepForm";
import { ParticipantsForm } from "./forms/participants/ParticipantsForm";
import { TasksForm } from "./forms/tasks/TasksForm";
import Participant from "./model/Participant";
import "../index.css";
import Task from "./model/Task";
import divideTasks from "./controller/taskDivider";
import UnpredictableTask from "./model/UnpredictableTask";
import TaskSchedule from "./model/TaskSchedule";
import TaskAssignment from "./ui/taskAssignment";

const PARTICIPANTS: Participant[] = [
  new Participant("Piti"),
  new Participant("Gati"),
];

type Response = {
  participants: string[];
};

const TASKS: Task[] = [new UnpredictableTask("vacuuming")];

function App() {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [tasks, setTasks] = useState(TASKS);
  const [taskSchedule, setTaskSchedule] = useState<TaskSchedule>();
  const [formPage, setFormPage] = useState("main");

  let resultTable = <div></div>;
  if (taskSchedule) {
    resultTable = <TaskAssignment schedule={taskSchedule} />;
  }
  let formComponent = <></>; //at first - main page with "start"

  switch (formPage) {
    case "main": {
      formComponent = <></>;
      break;
    }
    case "participants": {
      formComponent = (
        <ParticipantsForm
          initParticipants={participants}
          setParticipants={setParticipants}
        />
      );
      break;
    }
    case "tasks": {
      formComponent = (
        <>
          <TasksForm initTasks={tasks} setTasks={setTasks} />
          <button
            onClick={async () => {
              let a: TaskSchedule = await divideTasks(participants, tasks);
              setTaskSchedule(a);
            }}
          >
            {" "}
            Divide tasks
          </button>
        </>
      );
      break;
    }
    case "results": {
      formComponent = resultTable;
      break;
    }
  }
  return (
    <>
      {formComponent}
      <ParticipantsForm
        initParticipants={participants}
        setParticipants={setParticipants}
      />
      <TasksForm initTasks={tasks} setTasks={setTasks} />
      <button
        onClick={async () => {
          let a: TaskSchedule = await divideTasks(participants, tasks);
          setTaskSchedule(a);
        }}
      >
        {/* zwracam Promise pending :)) */}
        Divide tasks
      </button>
      {resultTable}
    </>
  );
}

export default App;
