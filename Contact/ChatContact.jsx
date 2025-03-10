import { createContext, useState, useContext, useEffect } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Load stored values from localStorage
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") || "");
  const [connected, setConnected] = useState(false);

  // Update localStorage whenever `roomId` or `currentUser` changes
  useEffect(() => {
    if (roomId) {
      localStorage.setItem("roomId", roomId);
    }
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    }
  }, [roomId, currentUser]);

  return (
    <ChatContext.Provider value={{ roomId, currentUser, connected, setRoomId, setCurrentUser, setConnected }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;
