import React, { useEffect } from "react";
import Chat from "./components/chat.js";
import Navbar from "./components/navbar.js";
import Login from "./components/login.js";
import { auth, provider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);

  // Handle Google Sign-in Redirect Result
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("User signed in:", result.user);
        }
      })
      .catch((err) => {
        console.error("Redirect sign-in error:", err.message);
      });
  }, []);

  const handleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} />

      {user ? (
        <div className="text-center mt-6">
          <p className="text-xl">Welcome, {user.displayName} 👋</p>
          <div className="chat-container">
            <Chat />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <Login handleSignIn={handleSignIn} />
        </div>
      )}
    </div>
  );
}

export default App;
