import TaskSchedule from "../model/TaskSchedule";

export default function TaskAssignment({
  schedule,
}: {
  schedule: TaskSchedule;
}) {
  const participantNames = Object.keys(schedule);

  return (
    <table>
      <thead>
        <tr>Results:</tr>
        <tr>
          {participantNames.map((participantName) => (
            <th key={participantName}>{participantName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {schedule[participantNames[0]].map((task, index) => (
          <tr key={index}>
            {participantNames.map((participantName) => (
              <td key={participantName}>{schedule[participantName][index]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
