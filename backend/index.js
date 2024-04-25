const e = require("express");
const express = require("express");
var cors = require("cors");
const app = express();
const PORT = 8080;

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("<p>Stronka</p>");
});

function compareDuration(a, b) {
  if (a.calculateDurationPerWeek() < b.calculateDurationPerWeek()) return 1;
  else if (a.calculateDurationPerWeek() > b.calculateDurationPerWeek()) {
    return -1;
  }
  return 0;
}

function assignTask(participants, tasks) {
  for (const participant of participants) {
    participant.totalDuration = 0;
    for (const task of participant.tasks) {
      participant.totalDuration += task.calculateDurationPerWeek();
    }
  }

  tasks.sort(compareDuration);

  const assignments = [];

  let index = 0;

  for (const task of tasks) {
    const participant = participants[index];
    assignments.push(new Assignment(participant, task));
    participant.tasks.push(task);
    participant.totalDuration += task.calculateDurationPerWeek();

    index = (index + 1) % participants.length;
  }

  return assignments;
}

class Participant {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.totalDuration = 0;
  }
}

class Task {
  constructor(name) {
    this.name = name;
  }
  calculateDurationPerWeek() {
    throw new Error(
      "You have to implement the method calculateDurationPerWeek!"
    );
  }
}

class RepetitiveTask extends Task {
  constructor(name, duration, frequency_in_week) {
    super(name);
    this.duration = duration;
    this.frequency_in_week = frequency_in_week;
  }
  calculateDurationPerWeek() {
    return this.duration * this.frequency_in_week;
  }
}

class UnpredictableTask extends Task {
  constructor(name, duration, probability_in_month) {
    super(name);
    this.duration = duration;
    this.probability_in_month = probability_in_month;
  }
  calculateDurationPerWeek() {
    return (this.duration * this.probability_in_month) / 4;
  }
}

class Assignment {
  constructor(participant, task) {
    this.participant = participant;
    this.task = task;
  }
}

app.post("/calculate-split", (req, res) => {
  const { tasks } = req.params;
  const { logo } = req.body;

  console.log(req.body);
  let repetitiveSum = 0;
  let unpredictableSum = 0;
  let participantsCount = req.body.participants.length;
  console.log(req.body);

  let participants = req.body.participants.map((a) => new Participant(a));

  let repetitiveTasks = req.body.tasks
    .filter((a) => a.type == "repetitive")
    .map((a) => new RepetitiveTask(a.name, a.duration, a.frequency_in_week));

  let unpredictableTasks = req.body.tasks
    .filter((a) => a.type == "unpredictable")
    .map(
      (a) => new UnpredictableTask(a.name, a.duration, a.probability_in_month)
    );

  let allTasks = repetitiveTasks.concat(unpredictableTasks);

  req.body.tasks
    .filter((a) => a.type == "repetitive")
    .map((a) => (repetitiveSum += a.duration * a.frequency_in_week));

  req.body.tasks
    .filter((a) => a.type == "unpredictable")
    .map((a) => (unpredictableSum += a.duration * a.probability_in_month));

  let durationSum = repetitiveSum + unpredictableSum;
  assignTask(participants, allTasks);
  res.send({
    participants: participants,
    repetitiveSum: repetitiveSum,
    unpredictableSum: unpredictableSum,
    durationPerPerson: durationSum / participantsCount,
    repetitivePerPerson: repetitiveSum / participantsCount,
    unpredictablePerPerson: unpredictableSum / participantsCount,
    repetitiveTasks: repetitiveTasks,
    unpredictableTasks: unpredictableTasks,
  });
});
