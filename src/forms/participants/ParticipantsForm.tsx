import Participant from "../../model/Participant";
import { useState } from "react";
import ParticipantInput from "./ParticipantInput";

type UserFormProps = {
  initParticipants: Participant[];
  setParticipants: (p: Participant[]) => void;
};

export function ParticipantsForm({
  initParticipants,
  setParticipants,
}: UserFormProps) {
  const [participants, setParticipants_] = useState(initParticipants);
  console.log("participant form rerender");

  function addParticipant() {
    console.log("onclick");
    setParticipants_((prev) => {
      prev.push(new Participant(""));
      let mod = [...prev];
      return mod;
    });
  }

  let participantInputs = [];
  for (const [i, p] of participants.entries()) {
    const participantSetter = (partialParticipant: Partial<Participant>) => {
      setParticipants_((prev) => {
        prev[i] = { ...prev[i], ...partialParticipant };
        console.log("setParticipant_ callback update");
        let newParticipants = [...prev];
        return newParticipants;
      });
    };

    participantInputs.push(
      <ParticipantInput
        index={i}
        key={i}
        p={p}
        participant_setter={participantSetter}
      ></ParticipantInput>
    );
  }

  return (
    <>
      <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
        Add the people you want to divide the tasks between.
      </h2>
      <div
        style={{
          display: "grid",
          gap: "1rem .5rem",
          justifyContent: "flex-start",
          gridTemplateColumns: "auto minmax(auto, 400px)",
        }}
      >
        {participantInputs}
        <button type="button" onClick={addParticipant}>
          +
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            setParticipants(participants);
          }}
        >
          Save participants
        </button>
      </div>
    </>
  );
}
