import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Função de validação de email
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Função de validação de senha
  const validatePassword = (senha) => senha.length >= 6;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("E-mail inválido.");
      return;
    }

    if (!validatePassword(password)) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    const currentUser = auth.currentUser; // Salva o usuário atual

    try {
      // Criar o novo usuário sem alterar a sessão do usuário atual
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Salvar dados no Realtime Database
      await set(ref(database, "usuarios/" + newUser.uid), {
        nome: nome,
        email: email,
        uid: newUser.uid,
      });

      // Restaurar o usuário atual
      if (currentUser) {
        await auth.updateCurrentUser(currentUser);
      }

      alert("Usuário criado com sucesso!");
      setError("");
      setNome("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso. Por favor, tente outro.");
      } else {
        setError(`Erro ao criar o usuário: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = () => {
    navigate("/");
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
        {/* Left Section */}
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
            }}
          >
            Create Account
          </h1>
          <img
            src="/path-to-your-illustration.png"
            alt="Illustration"
            style={{ width: "80%", marginTop: "20px" }}
          />
        </div>

        {/* Right Section */}
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
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "300px" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#6B7280",
                }}
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="confirmPassword"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#6B7280",
                }}
              >
                Confirm your password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              <p style={{ color: "#EF4444", fontSize: "14px" }}>{error}</p>
            )}

            <button
              type="submit"
              style={{
                width: "108%",
                padding: "12px",
                backgroundColor: "#1E3A8A",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <button
              onClick={redirectToLogin}
              style={{
                background: "none",
                border: "none",
                color: "#1E3A8A",
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              marginRight: '-20px'
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
