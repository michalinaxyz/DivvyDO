import { useState, useRef } from "react";
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
  new Participant("User1"),
  new Participant("User2"),
];

const TASKS: Task[] = [new UnpredictableTask("vacuuming")];

function App() {
  const participants = useRef(PARTICIPANTS);
  const tasks = useRef(TASKS);
  const [taskSchedule, setTaskSchedule] = useState<TaskSchedule>();
  const [formPage, setFormPage] = useState("main");

  const handleNext = () => {
    setFormPage((prev) => {
      switch (prev) {
        case "main":
          return "participants";
        case "participants":
          return "tasks";
        case "tasks":
          return "results";
        default:
          return prev;
      }
    });
  };

  const handleBack = () => {
    setFormPage((prev) => {
      switch (prev) {
        case "participants":
          return "main";
        case "tasks":
          return "participants";
        case "results":
          return "tasks";
        default:
          return prev;
      }
    });
  };

  let resultTable = <div></div>;
  if (taskSchedule) {
    resultTable = <TaskAssignment schedule={taskSchedule} />;
  }

  function getFormComponent() {
    switch (formPage) {
      case "main": {
        return <h1>DivvyDO</h1>;
      }
      case "participants": {
        return (
          <ParticipantsForm
            participantsRef={participants}
            handleNext={handleNext}
          />
        );
      }
      case "tasks": {
        return (
          <>
            <TasksForm tasksRef={tasks} />
            <button
              onClick={async () => {
                let a: TaskSchedule = await divideTasks(
                  participants.current,
                  tasks.current
                );
                setTaskSchedule(a);
                handleNext();
              }}
            >
              Divide tasks
            </button>
          </>
        );
      }
      case "results": {
        return resultTable;
      }
      default:
        return <></>;
    }
  }

  return (
    <>
      {getFormComponent()}
      <div>
        <button
          style={{
            display:
              formPage === "main" || formPage === "participants" ? "none" : "",
          }}
          onClick={() => {
            handleBack();
          }}
        >
          Back
        </button>
        <button
          style={{
            display:
              formPage === "results" ||
              formPage === "participants" ||
              formPage === "tasks"
                ? "none"
                : "",
          }}
          onClick={() => {
            handleNext();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
