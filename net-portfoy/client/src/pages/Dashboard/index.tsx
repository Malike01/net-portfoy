import React, { useState } from 'react';
import { Typography, Divider, FloatButton } from 'antd';
import { PlusOutlined, FolderAddOutlined, UserAddOutlined } from '@ant-design/icons';

import { StatCards } from './components/StatCards';
import { AgendaList } from './components/AgendaList';
import { PortfolioForm } from '../Portfolios/components/PortfolioForm';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

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
        icon={<PlusOutlined />}
      >
        <FloatButton
          icon={<FolderAddOutlined />}
          tooltip="Yeni Portföy"
          onClick={() => setIsPortfolioModalOpen(true)}
        />
        <FloatButton
          icon={<UserAddOutlined />}
          tooltip="Yeni Müşteri"
        />
      </FloatButton.Group>

      <PortfolioForm
        open={isPortfolioModalOpen}
        onCancel={() => setIsPortfolioModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;