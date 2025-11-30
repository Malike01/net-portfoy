import React, { useEffect } from 'react';
import { Typography, Divider, FloatButton, Skeleton, Tag } from 'antd';
import { FolderAddOutlined, UserAddOutlined, ThunderboltOutlined, CalendarOutlined, PhoneOutlined } from '@ant-design/icons';
import { StatCards } from './components/StatCards';
import { AgendaList } from './components/AgendaList';
import { PortfolioForm } from '../Portfolios/components/PortfolioForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsPortfolioModalOpen } from '@/store/portfoliosSlice';
import { CustomerForm } from '../Customers/components/CustomerForm';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import styles from './Dashboard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/tr';
import {  fetchDashboardStats } from '@/services/dashboardService';

const { Title } = Typography;

dayjs.extend(relativeTime);
dayjs.locale('tr');

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { stats, isLoading } = useAppSelector((state) => state.dashboard);
  const kpi = stats && stats.kpi || null;

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, []);

  if (isLoading && !kpi) return <div className="p-6"><Skeleton active /></div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>Genel Durum</Title>

        <div className={styles.widgetsContainer}>
          <div className={styles.widgetCard}>
            <div
              className={styles.iconBox}
              style={{
                background: '#e6f7ff',
                color: '#1890ff',
              }}
            >
              <CalendarOutlined />
            </div>
            <div>
              <div className={styles.widgetTitle}>Bekleyen Randevular</div>
              <div className={styles.widgetValue}>{kpi?.pendingAppointments || 0}</div>
            </div>
          </div>

          <div className={styles.widgetCard}>
            <div
              className={styles.iconBox}
              style={{
                background: '#eec0b5ff',
                color: '#9b2424ff',
              }}
            >
              <PhoneOutlined />
            </div>
            <div>
              <div className={styles.widgetTitle}>Aranacak Listesi</div>
              <div className={styles.widgetValue}>{kpi?.callListCount || 0}</div>
            </div>
          </div>
        </div>
      </div>
      <Divider className={styles.divider} />

      <StatCards />
      <AgendaList />

      <FloatButton.Group
        trigger="click"
        type="primary"
        className={styles.floatButton}
        icon={<ThunderboltOutlined />}
      >
        <FloatButton
          icon={<FolderAddOutlined />}
          tooltip="Yeni Portföy"
          onClick={() => dispatch(setIsPortfolioModalOpen(true))}
        />
        <FloatButton
          icon={<UserAddOutlined />}
          tooltip="Yeni Müşteri"
          onClick={() => dispatch(setIsCustomerModalOpen(true))}
        />
      </FloatButton.Group>

      <PortfolioForm />
      <CustomerForm />
    </div>
  );
};

export default Dashboard;