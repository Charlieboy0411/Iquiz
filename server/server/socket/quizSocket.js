let rooms = {};

export default function(io) {

  io.on("connection", (socket) => {

    socket.on("joinRoom", ({ roomId, name }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = { users: [], scores: {} };
      }

      rooms[roomId].users.push(name);

      io.to(roomId).emit("participants", rooms[roomId].users);
    });

    socket.on("sendQuestion", ({ roomId, question }) => {
      io.to(roomId).emit("question", question);
    });

    socket.on("answer", ({ roomId, name, correct }) => {
      if (correct) {
        rooms[roomId].scores[name] =
          (rooms[roomId].scores[name] || 0) + 10;
      }

      io.to(roomId).emit("leaderboard", rooms[roomId].scores);
    });

  });
}
