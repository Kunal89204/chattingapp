import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { socket } from '../App';
import { useAuthStore } from '../context/store';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';


const GroupChat = () => {
  const { groupId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuthStore();
  const username = user?.user?.username;
  const messagesEndRef = useRef(null);

  const room = groupId;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const fetchRoomChats = () => {
    axios.get(`http://localhost:8000/api/v1/roomchats/${groupId}`)
    .then((respo) => {
      setMessages(respo.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    // Join the group room
    socket.emit('joinGroup', { room });
    fetchRoomChats()

    // Listen for incoming group messages
    const handleGroupMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on('groupMessage', handleGroupMessage);

    // Clean up the effect
    return () => {
      socket.emit('leaveGroup', { room });
      socket.off('groupMessage', handleGroupMessage);
    };
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim() !== "") {
      socket.emit('groupMessage', { room, message, sender:{username} });
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-black custom-bg">
      <h1 className="backdrop-blur-lg text-2xl text-center capitalize py-2">
      <Link className="absolute left-5" to="/">
          <FaArrowLeft />
        </Link>
        Group Chat
      </h1>
      <div className="flex flex-col mb-4 overflow-y-auto h-[80vh] px-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 max-w-[70vw] break-words p-2 rounded-lg ${
              msg.sender.username === username
                ? 'bg-blue-500 text-white self-end -translate-x-4'
                : 'bg-gray-300 self-start'
            }`}
          >
            <strong className="text-sm">
              {msg.sender.username === username ? 'You' : msg.sender.username}
            </strong>
            <div>{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-5">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 p-2 w-[50vw] rounded bg-gray-800 text-white"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-orange-500 text-white py-2 px-8 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
