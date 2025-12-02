import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Result, Button } from 'antd';

const AdminRoute: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user && user.role === 'admin') {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Result
        status="403"
        title="Erişim Reddedildi"
        subTitle="Bu sayfayı görüntülemek için Yönetici yetkisine sahip olmalısınız."
        extra={<Button type="primary" href="/">Ana Sayfaya Dön</Button>}
      />
    </div>
  );
};

export default AdminRoute;