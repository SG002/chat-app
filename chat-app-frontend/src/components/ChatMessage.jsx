import { useAuth } from '../context/AuthContext';

function ChatMessage({ message }) {
  const { user } = useAuth();
  const isOwnMessage = message.sender === user.id;

  const styles = {
    messageContainer: {
      marginBottom: '8px',
      display: 'flex',
      justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
    },
    messageBox: {
      maxWidth: '70%',
      backgroundColor: isOwnMessage ? '#3182ce' : '#f2f2f2',
      color: isOwnMessage ? 'white' : 'black',
      padding: '12px',
      borderRadius: '8px',
    },
    messageText: {
      margin: 0,
      wordBreak: 'break-word',
    },
    timestamp: {
      fontSize: '12px',
      color: isOwnMessage ? 'rgba(255,255,255,0.8)' : '#666',
      marginTop: '4px',
    }
  };

  return (
    <div style={styles.messageContainer}>
      <div style={styles.messageBox}>
        <p style={styles.messageText}>{message.message}</p>
        <p style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;