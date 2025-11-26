import React, { useState } from 'react';
import { Typography, Tooltip, Button, Tag } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  PhoneOutlined, 
  WalletOutlined, 
  UserAddOutlined 
} from '@ant-design/icons';
import { agendaItems } from '../../../constant';


const { Title, Text } = Typography;

export const AgendaList: React.FC = () => {
  const [tasks, setTasks] = useState(agendaItems);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const getStyleByType = (type: string) => {
    switch (type) {
      case 'call': 
        return { icon: <PhoneOutlined />, color: '#3b82f6', bg: '#eff6ff' };
      case 'offer': 
        return { icon: <WalletOutlined />, color: '#f97316', bg: '#fff7ed' };
      default: 
        return { icon: <UserAddOutlined />, color: '#a855f7', bg: '#f3e8ff' };
    }
  };

  return (
    <div style={{ marginTop: 32 }}>
      <Title level={4} style={{ marginBottom: 16 }}>Bugünün Ajandası</Title>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tasks.map((item) => {
          const style = getStyleByType(item.type);
          
          return (
            <div 
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                backgroundColor: '#fff',
                borderRadius: 12,
                border: '1px solid #f0f0f0',
                opacity: item.isCompleted ? 0.6 : 1,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: item.isCompleted ? '#e5e7eb' : style.bg,
                  color: item.isCompleted ? '#9ca3af' : style.color,
                  fontSize: 18
                }}>
                  {style.icon}
                </div>

                <div>
                  <Text strong delete={item.isCompleted} style={{ display: 'block', fontSize: 16, marginBottom: 4 }}>
                    {item.client}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag color={item.type === 'offer' ? 'orange' : 'blue'} bordered={false}>
                      {item.action}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>
                      <ClockCircleOutlined style={{ marginRight: 4 }} /> {item.time}
                    </Text>
                  </div>
                </div>
              </div>

              <Tooltip title={item.isCompleted ? "Geri Al" : "Tamamlandı İşaretle"}>
                <Button 
                  shape="circle" 
                  type="text"
                  icon={<CheckCircleOutlined />} 
                  onClick={() => toggleTask(item.id)}
                  style={{
                    color: item.isCompleted ? '#52c41a' : '#d9d9d9',
                    fontSize: 16,
                    border: item.isCompleted ? '1px solid #b7eb8f' : '1px solid #d9d9d9',
                    backgroundColor: item.isCompleted ? '#f6ffed' : 'transparent'
                  }}
                />
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};