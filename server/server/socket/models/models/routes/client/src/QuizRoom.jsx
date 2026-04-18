import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function QuizRoom() {
  const [question, setQuestion] = useState(null);
  const [leaderboard, setLeaderboard] = useState({});

  useEffect(() => {
    socket.emit("joinRoom", { roomId: "123", name: "User" });

    socket.on("question", setQuestion);
    socket.on("leaderboard", setLeaderboard);

  }, []);

  const answer = (i) => {
    const correct = i === question.correct;
    socket.emit("answer", { roomId: "123", name: "User", correct });
  };

  return (
    <div>
      {question && (
        <>
          <h2>{question.text}</h2>
          {question.options.map((opt, i) => (
            <button key={i} onClick={() => answer(i)}>
              {opt}
            </button>
          ))}
        </>
      )}

      <h3>Leaderboard</h3>
      {Object.entries(leaderboard).map(([name, score]) => (
        <p key={name}>{name}: {score}</p>
      ))}
    </div>
  );
}
