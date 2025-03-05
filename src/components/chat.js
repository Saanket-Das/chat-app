import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null); // Ref for auto-scroll

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Scroll to bottom when new messages arrive
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      timestamp: new Date(),
      user: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL || "https://via.placeholder.com/40", // Default profile pic
      uid: auth.currentUser.uid,
    });

    setNewMessage(""); // Clear input field
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {/* Chat Box */}
      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: msg.uid === auth.currentUser.uid ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: "10px"
            }}
          >
            {/* Profile Image */}
            <img
              src={msg.photoURL}
              alt="Profile"
              style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
            />

            {/* Message Box */}
            <div
              style={{
                backgroundColor: msg.uid === auth.currentUser.uid ? "#4A90E2" : "#E5E5E5",
                color: msg.uid === auth.currentUser.uid ? "white" : "black",
                padding: "10px",
                borderRadius: "15px",
                maxWidth: "60%",
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: "bold", margin: 0, textAlign: "left" }}>
                {msg.user}
              </p>
              <p style={{ margin: 0 }}>{msg.text}</p>
            </div>
          </div>
        ))}
        {/* Dummy div to ensure auto-scroll */}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} style={{ marginTop: "10px", display: "flex" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            width: "80%",
            padding: "10px",
            color: "black",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "10px", backgroundColor: "#4A90E2", color: "white", borderRadius: "5px" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
