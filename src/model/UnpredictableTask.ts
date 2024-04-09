import Task from "./Task";

export default class UnpredictableTask extends Task {
  probabilityInAMonth: number;
  unitDuration: number;

  constructor(
    name: string,
    probabilityInAMonth: number = 0,
    unitDuration: number = 0
  ) {
    super(name);
    this.probabilityInAMonth = probabilityInAMonth;
    this.unitDuration = unitDuration;
    this.durationPerWeek = (probabilityInAMonth / 4) * unitDuration;
  }
}
