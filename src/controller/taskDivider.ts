import Participant from "../model/Participant";
import Task from "../model/Task";
import TaskSchedule from "../model/TaskSchedule";
import RepetitiveTask from "../model/RepetitiveTask";
import UnpredictableTask from "../model/UnpredictableTask";

function prepareRequestBody(
  participants: Participant[],
  tasks: Task[]
): Object {
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

type calculateSplitResponse = {
  participants: {
    name: string;
    tasks: {
      name: string;
      duration: number;
      frequency_in_week?: number;
      probility_in_month?: number;
    }[];
    totalDuration: number;
  }[];
};

function makeScheduleFromResponse(
  response: calculateSplitResponse
): TaskSchedule {
  //TODO: map response to a TaskSchedule

  const schedule: TaskSchedule = {};

  for (const participant of response.participants) {
    schedule[participant.name] = participant.tasks.map((task) => task.name);
  }

  return schedule;
}

export default async function divideTasks(
  participants: Participant[],
  tasks: Task[]
): Promise<TaskSchedule> {
  const requestBody = prepareRequestBody(participants, tasks);

  const response = await fetch("http://localhost:8080/calculate-split", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status === 200) {
    const data = await response.json();
    let taskSchedule = makeScheduleFromResponse(data);
    return taskSchedule;
  } else {
    throw new Error(`Status: ${response.status}`);
  }
}

// zwracamy data z wynikiem podziału schedule, jak je użyć w taskDivider?
