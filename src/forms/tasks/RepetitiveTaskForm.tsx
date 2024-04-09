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
      <br />
      <div className="description">How often this chore must be completed?</div>
      <br />

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
      <br />
      <label>Duration</label>
      <br />
      <div className="description">
        How long does this task take (at one time)?
      </div>
      <br />
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
      <br />
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
