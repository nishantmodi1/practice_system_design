import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});

  useEffect(() => {
    // Connect to WebSocket
    const newSocket = io('http://localhost:5555');
    console.log('newSocket>>>', newSocket)
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on('chat message', (msg) => {
      console.log('msg>>>', msg)
      setMessages(prev => [...prev, msg]);
    });

    // Listen for typing indicators
    newSocket.on('user typing', ({ userId, isTyping }) => {
      setTypingUsers(prev => ({
        ...prev,
        [userId]: isTyping
      }));
      setTimeout(() => {
        setTypingUsers(prev => ({ ...prev, [userId]: false }));
      }, 1000);
    });

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && socket) {
      socket.emit('chat message', { text: input });
      setInput('');
      setIsTyping(false);
      socket.emit('typing', false);
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (!isTyping && e.target.value) {
      setIsTyping(true);
      socket.emit('typing', true);
    } else if (!e.target.value) {
      setIsTyping(false);
      socket.emit('typing', false);
    }
  };

  const typingCount = Object.values(typingUsers).filter(Boolean).length;

  return (
    <div style={{ minWidth: '500px', margin: '0 auto' }}>
      <h2>💬 Live Chat</h2>

      <div style={{
        border: '1px solid #ccc',
        height: '400px',
        overflowY: 'auto',
        padding: '10px',
        marginBottom: '10px'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <strong>{msg.userId.slice(0, 6)}:</strong>{' '}
            {msg.text}
            <span style={{ fontSize: '10px', marginLeft: '8px', color: '#666' }}>
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {typingCount > 0 && (
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
          {typingCount} user{typingCount > 1 ? 's are' : ' is'} typing...
        </div>
      )}

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={handleTyping}
          placeholder="Type a message..."
          style={{ width: '80%', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatApp
