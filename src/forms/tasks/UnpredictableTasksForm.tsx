import { useState } from "react";
import { FormWrapper } from "../../FormWrapper";
import Task from "../../model/Task";
import UnpredictableTask from "../../model/UnpredictableTask";

type UnprTaskFormProps = {
  addTask: (t: Task) => void;
  name: string;
};

export default function UnpredictableTasksForm({
  addTask,
  name,
}: UnprTaskFormProps) {
  const [unprTask, setUnprTask] = useState(new UnpredictableTask(name));

  return (
    <FormWrapper title=" ">
      <label>Probability</label>
      <br />
      <div className="description">
        How high are the chances that this task will need to be completed within
        a month?
      </div>
      <br />
      <input
        required
        type="range"
        name="probability in a month"
        min="10"
        max="90"
        onChange={(e) => {
          setUnprTask(
            new UnpredictableTask(
              unprTask.name,
              Number(e.target.value) / 100,
              unprTask.unitDuration
            )
          );
        }}
      />
      <br />
      <label>Duration</label>
      <br />
      <div className="description">How long it will take then?</div>
      <br />
      <input
        required
        type="number"
        onChange={(e) => {
          setUnprTask(
            new UnpredictableTask(
              unprTask.name,
              unprTask.probabilityInAMonth,
              Number(e.target.value)
            )
          );
        }}
      />{" "}
      <span>minutes</span>
      <button
        onClick={() => {
          addTask(unprTask);
        }}
      >
        {" "}
        Add a task{" "}
      </button>
    </FormWrapper>
  );
}
