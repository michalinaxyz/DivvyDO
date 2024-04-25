import { useState } from "react";
import { FormWrapper } from "../../FormWrapper";
import Task from "../../model/Task";
import RepetitiveTask from "../../model/RepetitiveTask";

type RepTaskFormProps = {
  addTask: (t: Task) => void;
  name: string;
};

export default function RepetitiveTasksForm({
  addTask,
  name,
}: RepTaskFormProps) {
  const [repTask, setRepTask] = useState(new RepetitiveTask(name));

  return (
    <FormWrapper title=" ">
      <label>Frequency in a week</label>
      <div className="description">How often this chore must be completed?</div>

      <input
        required
        type="number"
        onChange={(e) => {
          setRepTask(
            new RepetitiveTask(
              repTask.name,
              Number(e.target.value),
              repTask.unitDuration
            )
          );
        }}
      />
      <label>Duration</label>
      <div className="description">
        How long does this task take (at one time)?
      </div>
      <input
        required
        type="number"
        onChange={(e) => {
          setRepTask(
            new RepetitiveTask(
              repTask.name,
              repTask.frequencyPerWeek,
              Number(e.target.value)
            )
          );
        }}
      />
      <button
        onClick={() => {
          addTask(repTask);
        }}
      >
        {" "}
        Add a task{" "}
      </button>
    </FormWrapper>
  );
}
