import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import Navbar from "./components/navbar";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("General");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, `rooms/${currentRoom}/messages`), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    return () => unsubscribe();
  }, [currentRoom]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, `rooms/${currentRoom}/messages`), {
      text: newMessage,
      timestamp: new Date(),
      user: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL || "https://via.placeholder.com/40",
      uid: auth.currentUser.uid,
    });

    setNewMessage("");
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <Navbar user={auth.currentUser} hoverEffect />
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/6 bg-gray-800 p-4 flex flex-col min-h-screen">
          <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
          <ul>
            {["General", "Hostel","Community Project"].map((room) => (
              <li 
                key={room} 
                className={`p-2 rounded cursor-pointer ${currentRoom === room ? "bg-gray-700" : "hover:bg-gray-700"}`}
                onClick={() => setCurrentRoom(room)}
              >
                {room}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col w-5/6 p-6">
          <h2 className="text-2xl font-semibold mb-4">{currentRoom} Room</h2>
          
          {/* Messages Box */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-lg">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-center ${msg.uid === auth.currentUser.uid ? "justify-end" : "justify-start"}`}>
                <img src={msg.photoURL} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                <div className={`p-3 rounded-lg max-w-xs ${msg.uid === auth.currentUser.uid ? "bg-blue-500" : "bg-gray-600"}`}>
                  <p className="text-sm font-bold">{msg.user}</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="flex mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-3 text-black rounded-l-lg border-none"
            />
            <button type="submit" className="bg-blue-500 px-4 py-3 rounded-r-lg text-white">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
