import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCmingw_iYpQZHgypdFMfaZE7lJCw9nwVI",
  authDomain: "controle-de-ponto-app.firebaseapp.com",
  databaseURL: "https://controle-de-ponto-app-default-rtdb.firebaseio.com",
  projectId: "controle-de-ponto-app",
  storageBucket: "controle-de-ponto-app.appspot.com",
  messagingSenderId: "41687923522",
  appId: "1:41687923522:web:3e87461b540c8acff2a6db",
  measurementId: "G-49SJ4Z8T2L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const ForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1E3A8A",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          width: "80%",
          maxWidth: "900px",
          height: "500px",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "#F3F4F6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <h1
            style={{
              color: "#1E3A8A",
              fontSize: "28px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Welcome to
          </h1>
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              marginTop: "20px",
            }}
          >
            <img
              src="/Logo.jpg"
              alt="Logo"
              style={{
                width: "80%",
                height: "80%",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#6B7280",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#6B7280",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#EF4444",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "108%",
                padding: "12px",
                backgroundColor: isLoading ? "#9CA3AF" : "#1E3A8A",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                cursor: isLoading ? "not-allowed" : "pointer",
                marginBottom: "10px",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <button
              onClick={ForgotPassword}
              style={{
                background: "none",
                border: "none",
                color: "#1E3A8A",
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Forgot Password
            </button>
            <button
              onClick={handleSignUp}
              style={{
                background: "none",
                border: "none",
                color: "#1E3A8A",
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
