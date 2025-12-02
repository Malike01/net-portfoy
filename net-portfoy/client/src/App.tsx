import './App.css'
import { useAppSelector } from './store/hooks'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import 'antd/dist/reset.css';
import AdminRoute from './components/AdminRoute'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd';


const MainLayout = lazy(() => import('@/layout/MainLayout'));
const PortfolioForm = lazy(() => import('@/pages/Portfolios/components/PortfolioForm').then(module => ({ default: module.PortfolioForm })));
const CustomerForm = lazy(() => import('@/pages/Customers/components/CustomerForm').then(module => ({ default: module.CustomerForm })));
const Users = lazy(() => import('@/pages/Users'));
const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customers = lazy(() => import('@/pages/Customers'));
const Portfolios = lazy(() => import('@/pages/Portfolios'));

function App() {
  return (
    <Suspense fallback={<Spin size="large" className='suspense-spinner' tip="Yükleniyor..."/>}>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolios" element={<Portfolios />}>
              <Route path="new" element={<PortfolioForm />} />
              <Route path=":id" element={<PortfolioForm />} />
            </Route>
            <Route path="/customers" element={<Customers />}>
              <Route path="new" element={<CustomerForm />} />
              <Route path=":id" element={<CustomerForm />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
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
