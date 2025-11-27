import './App.css'
import { useAppSelector } from './store/hooks'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import 'antd/dist/reset.css';
import Portfolios from './pages/Portfolios'
import Customers from './pages/Customers'

function App() {
  return (
   <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/customers" element={<Customers />} />
        </Route>
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
