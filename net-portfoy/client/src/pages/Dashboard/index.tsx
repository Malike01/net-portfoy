import React from 'react';
import { Typography,  Divider} from 'antd';

import { StatCards } from './components/StatCards';
import { AgendaList } from './components/AgendaList';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div style={{ paddingBottom: 24 }}>
      <Title level={2}>Anasayfa</Title>
        <Divider />
          <StatCards />
            <AgendaList />
    </div>
  );
};

export default Dashboard;