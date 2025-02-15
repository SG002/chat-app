const MESSAGES_KEY = 'chat_messages';

export const saveMessages = (sessionId, messages) => {
  const allMessages = getAllMessages();
  allMessages[sessionId] = messages;
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
};

export const getMessages = (sessionId) => {
  const allMessages = getAllMessages();
  return allMessages[sessionId] || [];
};

export const getAllMessages = () => {
  const messages = localStorage.getItem(MESSAGES_KEY);
  return messages ? JSON.parse(messages) : {};
};

export const clearMessages = (sessionId) => {
  const allMessages = getAllMessages();
  delete allMessages[sessionId];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
};