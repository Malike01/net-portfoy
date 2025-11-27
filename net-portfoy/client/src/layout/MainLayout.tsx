import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown, theme, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import { PortfolioForm } from '../pages/Portfolios/components/PortfolioForm';
import logo from '../../public/logo.png';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Panel',
      onClick: () => navigate('/'),
    },
    {
      key: '/portfolios',
      icon: <HomeOutlined />,
      label: 'Portföyler',
      onClick: () => navigate('/portfolios'),
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: 'Müşteriler',
      onClick: () => navigate('/customers'),
    },
  ];

  const userMenuPoints = [
    {
      key: '1',
      label: 'Hesap Ayarları',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Çıkış Yap',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        theme='light'
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          padding: 10
        }}
      >
        <div className="h-16 m-4 flex items-center justify-center bg-white/10 rounded-lg">
          {collapsed ? (
            <HomeOutlined style={{ fontSize: '20px', padding: 18 }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
              <img src={logo} alt="NetPortfoy Logo" style={{ width: 28, height: 28, marginRight: 8 }} />
              <Text strong style={{ fontSize: '20px' }}>NetPortfoy</Text>
            </div>
          )}
        </div>

        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <div className="mr-6 flex items-center gap-3" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="text-right hidden sm:block">
              <Text strong className="block leading-tight">{user?.name || 'Danışman'} {' '}</Text>
              <Text type="secondary" className="text-xs">Gayrimenkul Danışmanı</Text>
            </div>

            <Dropdown menu={{ items: userMenuPoints as any }} placement="bottomRight">
              <Avatar
                style={{ backgroundColor: '#415a77', cursor: 'pointer', marginLeft: 8, marginRight: 8 }}
                icon={<UserOutlined />}
                size="large"
              />
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: '12px 12px',
            padding: 24,
            minHeight: 280,
            overflowY: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <PortfolioForm />
    </Layout>
  );
};

export default MainLayout;