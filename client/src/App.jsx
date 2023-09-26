import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (!room) {
      return;
    }
    socket.emit("join_room", room);
  };

  const sendMessage = () => {
    socket.emit("send_message", { room, message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <>
      <div>
        <input
          placeholder="Room number..."
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <input
          placeholder="Message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message:</h1>
        {messageReceived}
      </div>
    </>
  );
};

export default App;
