import Task from "../../model/Task";
import { TaskForm } from "./TaskForm";
import { useState } from "react";

type TasksFormProps = {
  tasksRef: { current: Task[] };
};

export function TasksForm({ tasksRef }: TasksFormProps) {
  const [taskList, setTaskList] = useState(new Array<Task>());

  const addTask = (task: Task) => {
    taskList.push(task);
    setTaskList([...taskList]);
    console.log("Adding a task");
  };

  function generateUniqueId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  return (
    <>
      <TaskForm addTask={addTask}></TaskForm>
      <ul>
        Added tasks:
        {taskList.map((task) => (
          <li key={generateUniqueId()}>{task.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          tasksRef.current = taskList;
        }}
      >
        Save tasks
      </button>
    </>
  );
}
