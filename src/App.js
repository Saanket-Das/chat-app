import React, { useEffect } from "react";
import Chat from "./components/chat.js";
import Navbar from "./components/navbar.js";
import { auth, provider, signInWithRedirect, getRedirectResult } from "./firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Handle redirect result on page load
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("User signed in:", result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect sign-in error:", error.message);
      });
  }, []);

  const handleSignIn = () => {
    signInWithRedirect(auth, provider);
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
          <Chat /> {/* Chat component is displayed */}
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
