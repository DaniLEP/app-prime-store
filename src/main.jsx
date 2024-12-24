import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// router configurated 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './componentes/Error/index.jsx'
import Cadastro from './pages/Auth/Register_User/Resgiter_User.jsx'
import Login from './pages/Auth/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import ForgotPassword from './pages/Auth/Forgot_Password/Forgot_Password.jsx'

const router = createBrowserRouter  ([
  {
  path: '/',
  element: <App/>,
  // Error Page
  errorElement: <ErrorPage/>,
  children: [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/register',
      element: <Cadastro />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    }
  ]
  } 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
