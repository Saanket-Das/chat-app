const Message = ({ msg, currentUser }) => {
    const isUserMessage = msg.user.name === currentUser.displayName;
  
    return (
      <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-2`}>
        <div className={`p-3 rounded-lg ${isUserMessage ? "bg-blue-400 text-white" : "bg-gray-300 text-black"}`}>
          <p className="font-bold">{msg.user.name}</p>
          <p>{msg.text}</p>
        </div>
      </div>
    );
  };
  
  export default Message;
  