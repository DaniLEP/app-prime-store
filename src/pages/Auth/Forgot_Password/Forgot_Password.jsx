import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Configuração do Firebase
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    setError("");
    setSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-mail de recuperação enviado! Verifique sua caixa de entrada e troque a senha.");
      setTimeout(() => {
        navigate("/");
      },);
    } catch (error) {
      setError("Erro ao enviar o e-mail. Verifique se o endereço está correto.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      {/* Coluna da mensagem de boas-vindas */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#1E3A8A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "white",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          Forgot your Password?
        </h2>
        <div
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            animation: "pulse 1.5s infinite",
          }}
        >
          <span style={{ fontWeight: "bold", color: "#1E3A8A" }}>easy</span>
          <span style={{ fontWeight: "bold", color: "#EF4444" }}>point</span>
        </div>
      </div>

      {/* Coluna do formulário */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#F9FAFB",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <label
            style={{
              fontSize: "14px",
              color: "#374151",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
            }}
            placeholder="Enter your email"
          />

          <button
            onClick={handlePasswordReset}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#1E3A8A",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Send Reset Link
          </button>

          {success && (
            <p
              style={{
                color: "#10B981",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {success}
            </p>
          )}

          {error && (
            <p
              style={{
                color: "#EF4444",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {error}
            </p>
          )}

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <a
              href="/"
              style={{
                color: "#1E3A8A",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
