import React, { useState } from 'react';
import { Typography, Divider, FloatButton } from 'antd';
import { FolderAddOutlined, UserAddOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { StatCards } from './components/StatCards';
import { AgendaList } from './components/AgendaList';
import { PortfolioForm } from '../Portfolios/components/PortfolioForm';
import { useAppDispatch } from '@/store/hooks';
import { setIsPortfolioModalOpen } from '@/store/portfoliosSlice';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  
  return (
    <div style={{ paddingBottom: 24 }}>
      <Title level={2}>Anasayfa</Title>
      <Divider />
      <StatCards />
      <AgendaList />

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24, bottom: 24 }}
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
        />
      </FloatButton.Group>

      <PortfolioForm/>
    </div>
  );
};

export default Dashboard;