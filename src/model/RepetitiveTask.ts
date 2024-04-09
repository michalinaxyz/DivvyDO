import Task from "./Task";

export default class RepetitiveTask extends Task {
  frequencyPerWeek: number;
  unitDuration: number;

  constructor(
    name: string,
    frequencyPerWeek: number = 0,
    unitDuration: number = 0
  ) {
    super(name);
    this.frequencyPerWeek = frequencyPerWeek;
    this.unitDuration = unitDuration;
    this.durationPerWeek = unitDuration * frequencyPerWeek;
  }

  displayRepetitiveTaskInfo(): void {
    super.displayTaskInfo();
    console.log(`Frequency: ${this.frequencyPerWeek}`);
    console.log(`Duration: ${this.unitDuration} minutes`);
  }
}
