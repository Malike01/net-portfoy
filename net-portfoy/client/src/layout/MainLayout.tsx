import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown, theme, Typography, List, Popover, Badge } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  CheckCircleTwoTone,
  BellOutlined,
  ProductOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import { PortfolioForm } from '../pages/Portfolios/components/PortfolioForm';
import logo from '../../public/logo.png';
import { MENU_KEYS, RECENT_NOTIFICATIONS, USER_MENU_KEYS } from '@/constant/Layout';
import { markNotificationRead } from '@/services/notificationService';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { items: notifications, unreadCount } = useAppSelector(state => state.notification);

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
      key: MENU_KEYS.DASHBOARD,
      icon: <ProductOutlined />,
      label: 'Genel Bakış',
      onClick: () => navigate(MENU_KEYS.DASHBOARD),
    },
    {
      key: MENU_KEYS.PORTFOLIOS,
      icon: <HomeOutlined />,
      label: 'Portföyler',
      onClick: () => navigate(MENU_KEYS.PORTFOLIOS),
    },
    {
      key: MENU_KEYS.CUSTOMERS,
      icon: <UserOutlined />,
      label: 'Müşteriler',
      onClick: () => navigate(MENU_KEYS.CUSTOMERS),
    },
  ];

  const userMenuPoints = [
    {
      key: USER_MENU_KEYS.SETTINGS,
      label: 'Hesap Ayarları',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: USER_MENU_KEYS.LOGOUT,
      label: 'Çıkış Yap',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const notificationContent = (
    <List
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item 
          className={!item.isRead ? 'bg-blue-50' : ''} // Okunmamışsa renkli
          actions={[
              !item.isRead && <Button type="link" size="small" onClick={() => dispatch(markNotificationRead(item._id))}>Okundu</Button>
          ]}
        >
          <List.Item.Meta
            title={<Text strong={!item.isRead}>{item.title}</Text>}
            description={item.message}
          />
        </List.Item>
    )}
    style={{ width: 350, maxHeight: 400, overflow: 'auto' }}
  />
  );

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
            <img src={logo} alt="NetPortfoy Logo" style={{ width: 28, height: 28, marginLeft: 18 }} />
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
            <Popover
              content={notificationContent}
              title="Bildirimler"
              trigger="click"
              placement="bottomRight"
            >
              <Badge count={unreadCount} size="small" offset={[-2, 2]} style={{ marginRight: 8 }}>
                <Button
                  shape="circle"
                  icon={<BellOutlined style={{ fontSize: 20 }} />}
                  style={{ border: 'none', background: 'transparent', boxShadow: 'none', marginRight: 8 }}
                />
              </Badge>
            </Popover>
            <div className="text-right hidden sm:block" style={{ marginRight: 12, textAlign: 'right' }}>
              <Text strong style={{ display: 'block', fontSize: '14px', lineHeight: '1.2', color: '#1f1f1f' }}>
                {user?.name || 'Danışman'}
              </Text>
              <Text type="secondary" style={{ fontSize: '11px', display: 'block' }}>
                Gayrimenkul Danışmanı
              </Text>
            </div>

            <Dropdown menu={{ items: userMenuPoints as any }} placement="bottomRight">
              <Avatar
                size={44}
                style={{
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #415a77 0%, #778da9 100%)',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 10px rgba(24, 144, 255, 0.2)',
                  fontSize: '18px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 8
                }}
              >
                {(user?.name || 'Danışman').charAt(0).toUpperCase()}
              </Avatar>
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