// src/components/Login.js
import { auth, provider, db } from "../firebase";


const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
