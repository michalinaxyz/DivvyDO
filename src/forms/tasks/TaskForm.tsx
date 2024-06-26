import { FormWrapper } from "../../FormWrapper";
import Task from "../../model/Task";

import RepetitiveTasksForm from "./RepetitiveTaskForm";
import UnpredictableTasksForm from "./UnpredictableTasksForm";

import { useState } from "react";

type TaskFormProps = {
  addTask: (t: Task) => void;
};

const TaskTypes: { [key: string]: string } = {
  UNPREDICTABLE: "unpredictable",
  REPETITIVE: "repetitive",
};

export function TaskForm({ addTask }: TaskFormProps) {
  const [taskType, setType] = useState("");
  const [name, setName] = useState("");

  let optionList = [
    <option hidden disabled selected={true} value="">
      {" "}
      -- select a task type --{" "}
    </option>,
  ];
  let subform = <></>;

  for (const key in TaskTypes) {
    optionList.push(
      <option value={TaskTypes[key]} key={key}>
        {TaskTypes[key]}
      </option>
    );
  }
  function subformAddTask(t: Task): void {
    addTask(t);
    setType("");
    setName("");
  }

  switch (taskType) {
    case TaskTypes.UNPREDICTABLE: {
      subform = <UnpredictableTasksForm addTask={subformAddTask} name={name} />;
      break;
    }
    case TaskTypes.REPETITIVE: {
      subform = <RepetitiveTasksForm addTask={subformAddTask} name={name} />;
      break;
    }
  }

  return (
    <div>
      <FormWrapper title="Add tasks to divide">
        <label>Task name</label>
        <input
          autoFocus
          required
          value={name}
          placeholder="Ex. Empty the dishwasher"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Task type</label> <br />
        <div className="description">
          Does the task occur routinely or randomly?
        </div>
        <select
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {optionList}
        </select>
      </FormWrapper>
      {subform}
    </div>
  );
}
