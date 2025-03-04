import React from "react";
import Chat from "./components/chat.js";
import Navbar from "./components/navbar.js";
import { auth, provider } from "./firebase"; // Ensure provider is exported from firebase.js
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Sign-in error:", err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-out error:", err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <Chat /> {/* Ensure Chat is displayed */}
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <p>Please sign in</p>
          <button onClick={handleSignIn}>Sign In with Google</button>
        </>
      )}
    </div>
  );
}

export default App;
