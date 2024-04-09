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
    //   <FormWrapper title="Add tasks to divide">
    //     <label>Task name</label>
    //     <input
    //       autoFocus
    //       required
    //       value={name}
    //       placeholder="Ex. Empty the dishwasher"
    //       onChange={(e) => setTasks({ name: e.target.value })}
    //     />
    //     <label>Task type</label>
    //     <select required onChange={(e) => setTasks({ type: e.target.value })}>
    //       <option value="repetitive">Repetitive</option>
    //       <option value="unpredictable">Unpredictable</option>
    //     </select>
    //     <label>Duration</label>
    //     <input
    //       required
    //       type="number"
    //       value={duration}
    //       onChange={(e) => setTasks({ duration: e.target.value })}
    //     />
    //     <label>Frequency in a week</label>
    //     <input
    //       required
    //       type="number"
    //       value={frequency_in_week}
    //       onChange={(e) => setTasks({ frequency_in_week: e.target.value })}
    //     />
    //   </FormWrapper>
  );
}
