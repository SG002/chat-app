import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import socketService from '../services/socket.js';
import { saveMessages, getMessages } from '../utils/messageStorage';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { user, logout } = useAuth();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const styles = {
    container: {
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
    },
    inputContainer: {
      display: 'flex',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    message: {
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '4px',
      maxWidth: '70%',
    },
    userMessage: {
      backgroundColor: '#3182ce',
      color: 'white',
      marginLeft: 'auto',
    },
    serverMessage: {
      backgroundColor: '#f0f0f0',
    },
    connectionStatus: {
      textAlign: 'center',
      padding: '5px',
      marginBottom: '10px',
      borderRadius: '4px',
      backgroundColor: '#f0f0f0',
      color: '#666',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    logoutButton: {
      padding: '8px 16px',
      backgroundColor: '#DC2626',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    console.log('Initializing socket connection...');
    const socket = socketService.connect();
    
    
    const userSessionId = `session_${user.id}`;
    const savedMessages = getMessages(userSessionId);
    setMessages(savedMessages);

    socket.on('connect', () => {
      console.log('Connected to chat server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      setIsConnected(false);
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
      setMessages(prev => {
        const newMessages = [...prev, data];
        saveMessages(userSessionId, newMessages); 
        return newMessages;
      });
    });

    return () => {
      console.log('Cleaning up socket connection...');
      socketService.disconnect();
    };
  }, [user, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() && isConnected) {
      socketService.sendMessage(newMessage, user.id, `session_${user.id}`); 
      setNewMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Chat</h2>
        <button 
          onClick={logout}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
      {!isConnected && (
        <div style={styles.connectionStatus}>
          Connecting to chat server...
        </div>
      )}
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === user.id ? styles.userMessage : styles.serverMessage),
            }}
          >
            <div>{msg.message}</div>
            <div style={{ fontSize: '0.8em', marginTop: '5px' }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={!isConnected}
        />
        <button 
          style={{
            ...styles.button,
            opacity: isConnected ? 1 : 0.5,
            cursor: isConnected ? 'pointer' : 'not-allowed'
          }} 
          onClick={handleSend}
          disabled={!isConnected}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;