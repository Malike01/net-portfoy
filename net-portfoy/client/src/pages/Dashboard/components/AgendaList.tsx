import React from 'react';
import { Typography, Tooltip, Button, Tag, Empty } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  PhoneOutlined, 
  WalletOutlined,  
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { completeAgendaTask } from '@/services/dashboardService';
import { AGENDA_CONFIG, AGENDA_STATUSES } from '@/constant/Dashboard';

const { Title, Text } = Typography;

export const AgendaList: React.FC = () => {
  const { stats } = useAppSelector((state) => state.dashboard);
  const agenda = stats && stats.agenda || [];
  
  const dispatch = useAppDispatch();
  
  const getStatusConfig = (type: string) => {
    const config = AGENDA_CONFIG[type as keyof typeof AGENDA_CONFIG] || AGENDA_CONFIG.DEFAULT;
    let icon = <UserOutlined />;

    switch (type) {
      case AGENDA_STATUSES.TO_CALL: icon = <PhoneOutlined />; break;
      case AGENDA_STATUSES.OFFER_MADE: icon = <WalletOutlined />; break;
      case AGENDA_STATUSES.APPOINTMENT: icon = <CalendarOutlined />; break;
      case AGENDA_STATUSES.NEW: icon = <UserOutlined />; break;
      default: icon = <UserOutlined />; break;
    }
    return { ...config, icon };
  };

  const handleCompleteTask = (id: string) => {
    dispatch(completeAgendaTask(id));
  };

  return (
    <div style={{ marginTop: 32 }}>
      <Title level={4} style={{ marginBottom: 16 }}>Bugünün Ajandası</Title>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {agenda.length > 0 ? agenda.map((item) => {
          const config = getStatusConfig(item.type);
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
                  backgroundColor: item.isCompleted ? '#e5e7eb' : config.bg,
                  color: item.isCompleted ? '#9ca3af' : config.color,
                  fontSize: 18
                }}>
                  {config.icon}
                </div>

                <div>
                  <Text strong delete={item.isCompleted} style={{ display: 'block', fontSize: 16, marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag color={item.type === 'offer' ? 'orange' : 'blue'} bordered={false}>
                      {item.isCompleted ? 'Tamamlandı' : config.text}
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
                  onClick={() => handleCompleteTask(item.id)}
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
        }): (
            <Empty description="Ajandanız bugün boş 🎉" />
          )}
      </div>
    </div>
  );
};