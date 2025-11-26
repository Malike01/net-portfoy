import { useState } from 'react'
import './App.css'
import { useAppSelector } from './store/hooks'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
   <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={< ></>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const RequireAuth = () => {
  const auth = useAppSelector((state) => state.auth);
    if (!auth) {
    return <Navigate to="/login" replace />; 
  }

  return auth.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default App
