import Participant from "../../model/Participant";

type ParticipantInputProps = {
  p: Participant;
  participant_setter: (p: Partial<Participant>) => void;
  index: number;
};

export default function ParticipantInput({
  p,
  participant_setter,
  index,
}: ParticipantInputProps) {
  console.log("rerender input");
  return (
    <>
      <label>{index}</label>
      <input
        autoFocus
        required
        type="text"
        value={p.name}
        onChange={(e) => {
          console.log("participantInput onChange");
          participant_setter({ name: e.target.value });
        }}
        placeholder={`Add participant ${index}.`}
      />
    </>
  );
}
