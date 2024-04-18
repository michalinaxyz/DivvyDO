import { FormWrapper } from "../../FormWrapper";
import Task from "../../model/Task";
import { TaskForm } from "./TaskForm";
import RepetitiveTask from "../../model/RepetitiveTask";
import UnpredictableTask from "../../model/UnpredictableTask";
import { useState } from "react";

type TasksFormProps = {
  initTasks: Task[];
  setTasks: (t: Task[]) => void;
};

export function TasksForm({ initTasks, setTasks }: TasksFormProps) {
  const [taskList, setTaskList] = useState(new Array<Task>());

  const addTask = (task: Task) => {
    taskList.push(task);
    setTaskList([...taskList]);
    console.log("Adding a task");
  };

  return (
    <>
      <TaskForm addTask={addTask}></TaskForm>
      <button
        onClick={() => {
          setTasks(taskList);
        }}
      >
        Save tasks
      </button>
    </>
  );
}
