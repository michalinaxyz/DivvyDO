import Participant from "../model/Participant";
import Task from "../model/Task";
import TaskSchedule from "../model/TaskSchedule";
import RepetitiveTask from "../model/RepetitiveTask";
import UnpredictableTask from "../model/UnpredictableTask";

function prepareRequestBody(
  participants: Participant[],
  tasks: Task[]
): TaskSchedule {
  const mappedTasks = tasks.map((t) => {
    if (t instanceof RepetitiveTask) {
      return {
        name: t.name,
        type: "repetitive",
        duration: t.unitDuration,
        frequency_in_week: t.frequencyPerWeek,
      };
    }

    if (t instanceof UnpredictableTask) {
      return {
        name: t.name,
        type: "unpredictable",
        duration: t.unitDuration,
        probability_in_month: t.probabilityInAMonth,
      };
    }
    throw new Error(`Not implementation for type ${t.constructor.name}!`);
  });

  const requestBody = {
    participants: participants.map((p) => p.name),
    tasks: mappedTasks,
  };

  return requestBody;
}

export default function divideTasks(
  participants: Participant[],
  tasks: Task[]
): TaskSchedule {
  const requestBody = prepareRequestBody(participants, tasks);

  //wysłać request (fetch lub XHR)

  fetch("http://localhost:8080/calculate-split", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => {
      if (res.status == 200) return res.json();
      else {
        throw new Error(`Status: ${res.status}`);
      }
    })
    .then((data) => console.log(data))
    .catch((e) => alert(e));

  return new TaskSchedule();
}
