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
import styles from './styles/AgendaList.module.css';

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
    <div className={`${styles.container} tour-agenda`}>
      <Title level={4} className={styles.title}>Bugünün Ajandası</Title>

      <div className={styles.list}>
        {agenda.length > 0 ? agenda.map((item) => {
          const config = getStatusConfig(item.type);
          return (
            <div
              key={item.id}
              className={`${styles.item} ${item.isCompleted ? styles.itemCompleted : ''}`}
            >
              <div className={styles.itemContent}>
                <div
                  className={styles.iconBox}
                  style={{
                    backgroundColor: item.isCompleted ? '#e5e7eb' : config.bg,
                    color: item.isCompleted ? '#9ca3af' : config.color,
                  }}
                >
                  {config.icon}
                </div>

                <div>
                  <Text strong delete={item.isCompleted} className={styles.itemTitle}>
                    {item.title}
                  </Text>
                  <div className={styles.itemMeta}>
                    <Tag color={item.type === 'offer' ? 'orange' : 'blue'} bordered={false}>
                      {item.isCompleted ? 'Tamamlandı' : config.text}
                    </Tag>
                    <Text type="secondary" className={styles.time}>
                      <ClockCircleOutlined className={styles.clockIcon} /> {item.time}
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
                  className={`${styles.actionButton} ${item.isCompleted ? styles.actionButtonCompleted : styles.actionButtonDefault}`}
                />
              </Tooltip>
            </div>
          );
        }) : (
          <Empty description="Ajandanız bugün boş 🎉" />
        )}
      </div>
    </div>
  );
};