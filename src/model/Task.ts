export default class Task {
  name: string;
  durationPerWeek?: number;

  constructor(name: string) {
    this.name = name;
  }

  displayTaskInfo(): void {
    console.log(`Task: ${this.name}`);
  }
}
