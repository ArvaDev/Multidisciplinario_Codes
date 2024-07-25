import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/pages/app';
import Register from './src/pages/register/register';
import Login from './src/pages/login/login';
import { VerifyToken } from './src/utils/verifyToken';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/app',
    element: <VerifyToken element={<App />} />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
