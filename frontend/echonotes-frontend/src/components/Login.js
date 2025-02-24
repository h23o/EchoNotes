import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };

  const signInWithGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card">
        <h2 className="text-center">Login</h2>
        {error && <p className="alert alert-danger text-center">{error}</p>}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-dark w-100 mb-2" onClick={signIn}>
          Sign In
        </button>
        <button className="google-btn w-100" onClick={signInWithGoogle}>
          <img src="/google-logo.webp" alt="Google Logo" className="google-logo" />
          Sign in with Google
        </button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
