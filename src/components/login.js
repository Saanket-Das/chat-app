import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

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
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-indigo-900 to-gray-900 text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 bg-[url('/public/stars.png')] bg-cover opacity-30"></div>

      <div className="relative z-10 bg-opacity-10 backdrop-blur-lg border border-indigo-400 p-8 rounded-2xl shadow-2xl w-96 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-300 drop-shadow-md">🌌 Welcome to Chat Galaxy</h1>
        <p className="text-gray-300 mb-4 mt-2">Sign in to explore the universe 🌠</p>

        <button
          className="bg-purple-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-400 transform hover:scale-105 duration-200"
          onClick={signInWithGoogle}
        >
          🚀 Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
