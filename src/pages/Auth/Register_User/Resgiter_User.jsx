// import React, { useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const firebaseConfig = {
//   apiKey: "AIzaSyCmingw_iYpQZHgypdFMfaZE7lJCw9nwVI",
//   authDomain: "controle-de-ponto-app.firebaseapp.com",
//   databaseURL: "https://controle-de-ponto-app-default-rtdb.firebaseio.com",
//   projectId: "controle-de-ponto-app",
//   storageBucket: "controle-de-ponto-app.appspot.com",
//   messagingSenderId: "41687923522",
//   appId: "1:41687923522:web:3e87461b540c8acff2a6db",
//   measurementId: "G-49SJ4Z8T2L"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Verifica se as senhas são iguais
//     if (password !== confirmPassword) {
//       setError('As senhas não coincidem.');
//       return;
//     }

//     try {
//       // Criação do usuário no Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//       // Obter o contador de IDs da coleção "usuarios"
//       const userIdRef = doc(db, "usuarios", "userId");
//       const userSnapshot = await getDoc(userIdRef);

//       let newUserId = 1; // Valor inicial do ID

//       if (userSnapshot.exists()) {
//         newUserId = userSnapshot.data().count + 1;
//       }

//       // Atualiza o contador de IDs no Firestore
//       await setDoc(userIdRef, { count: newUserId });

//       // Cria o documento do novo usuário na coleção "usuarios" com o ID gerado
//       const userDocRef = doc(db, "usuarios", newUserId.toString());
//       await setDoc(userDocRef, {
//         email,
//         userId: newUserId,
//         createdAt: new Date(),
//       });

//       // Redireciona para a página home após o cadastro
//       navigate('/home');
//     } catch (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         setError('Este e-mail já está em uso. Faça login ou use um e-mail diferente.');
//       } else {
//         setError('Falha ao criar conta. Tente novamente.');
//       }
//       console.error("Erro ao criar usuário:", error.message);
//     }
//   };

//   const redirectToLogin = () => {
//     navigate('/');
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#1E3A8A',
//       fontFamily: 'Poppins, sans-serif'
//     }}>
//       <div style={{
//         display: 'flex',
//         backgroundColor: '#fff',
//         borderRadius: '12px',
//         overflow: 'hidden',
//         boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
//         width: '80%',
//         maxWidth: '900px',
//         height: '500px'
//       }}>
//         {/* Left Section */}
//         <div style={{
//           flex: 1,
//           backgroundColor: '#F3F4F6',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           padding: '20px'
//         }}>
//           <h1 style={{
//             color: '#1E3A8A',
//             fontSize: '28px',
//             fontWeight: '600'
//           }}>Create Accout</h1>
//           <img 
//             src="/path-to-your-illustration.png" 
//             alt="Illustration" 
//             style={{ width: '80%', marginTop: '20px' }}
//           />
//         </div>

//         {/* Right Section */}
//         <div style={{
//           flex: 1,
//           padding: '40px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: '300px' }}>
//             <div style={{ marginBottom: '20px' }}>
//               <label htmlFor="email" style={{
//                 display: 'block',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 marginBottom: '8px',
//                 color: '#6B7280'
//               }}>Email</label>
//               <input 
//                 type="email" 
//                 id="email" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '12px',
//                   border: '1px solid #D1D5DB',
//                   borderRadius: '8px',
//                   fontSize: '14px'
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//               <label htmlFor="password" style={{
//                 display: 'block',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 marginBottom: '8px',
//                 color: '#6B7280'
//               }}>Password</label>
//               <input 
//                 type="password" 
//                 id="password" 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '12px',
//                   border: '1px solid #D1D5DB',
//                   borderRadius: '8px',
//                   fontSize: '14px'
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//               <label htmlFor="confirmPassword" style={{
//                 display: 'block',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 marginBottom: '8px',
//                 color: '#6B7280'
//               }}>Confirm your password</label>
//               <input 
//                 type="password" 
//                 id="confirmPassword" 
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '12px',
//                   border: '1px solid #D1D5DB',
//                   borderRadius: '8px',
//                   fontSize: '14px'
//                 }}
//               />
//             </div>

//             {error && <p style={{ color: '#EF4444', fontSize: '14px' }}>{error}</p>}

//             <button type="submit" style={{
//               width: '100%',
//               padding: '12px',
//               backgroundColor: '#1E3A8A',
//               color: '#fff',
//               fontSize: '14px',
//               fontWeight: '600',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               marginBottom: '10px'
//             }}>Sign up</button>
//           </form>
//           <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '300px' }}>
//             <button onClick={redirectToLogin} style={{
//               background: 'none',
//               border: 'none',
//               color: '#1E3A8A',
//               fontSize: '12px',
//               cursor: 'pointer',
//               textDecoration: 'underline'
//             }}>Sign in</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { setLogLevel } from 'firebase/app';

setLogLevel('debug');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmingw_iYpQZHgypdFMfaZE7lJCw9nwVI",
  authDomain: "controle-de-ponto-app.firebaseapp.com",
  databaseURL: "https://controle-de-ponto-app-default-rtdb.firebaseio.com",
  projectId: "controle-de-ponto-app",
  storageBucket: "controle-de-ponto-app.appspot.com",
  messagingSenderId: "41687923522",
  appId: "1:41687923522:web:3e87461b540c8acff2a6db",
  measurementId: "G-49SJ4Z8T2L"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // Criação do usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Criação do documento do usuário na coleção "usuarios"
      const userDocRef = doc(db, "usuarios", userCredential.user.uid);
      await setDoc(userDocRef, {
        email,
        createdAt: new Date(),
      });

      console.log("Usuário criado no Firestore");

      // Exibe o alerta de sucesso
      alert('Usuário criado com sucesso!');

      // Redireciona para a página de login após 1 segundo
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso. Faça login ou use um e-mail diferente.');
      } else {
        setError('Falha ao criar conta. Tente novamente.');
      }
      console.error("Erro ao criar usuário:", error.message);
    }
  };

  const redirectToLogin = () => {
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1E3A8A',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        width: '80%',
        maxWidth: '900px',
        height: '500px'
      }}>
        {/* Left Section */}
        <div style={{
          flex: 1,
          backgroundColor: '#F3F4F6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <h1 style={{
            color: '#1E3A8A',
            fontSize: '28px',
            fontWeight: '600'
          }}>Create Account</h1>
          <img
            src="/path-to-your-illustration.png"
            alt="Illustration"
            style={{ width: '80%', marginTop: '20px' }}
          />
        </div>

        {/* Right Section */}
        <div style={{
          flex: 1,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: '300px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#6B7280'
              }}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#6B7280'
              }}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="confirmPassword" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#6B7280'
              }}>Confirm your password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            {error && <p style={{ color: '#EF4444', fontSize: '14px' }}>{error}</p>}

            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1E3A8A',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}>Sign up</button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '300px' }}>
            <button onClick={redirectToLogin} style={{
              background: 'none',
              border: 'none',
              color: '#1E3A8A',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
