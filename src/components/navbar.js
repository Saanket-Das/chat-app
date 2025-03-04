import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const Navbar = ({ user }) => {
  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">Chat App</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full" />
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
          Login with Google
        </button>
      )}
    </nav>
  );
};

export default Navbar;
