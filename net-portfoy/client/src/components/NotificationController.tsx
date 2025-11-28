import React, { useEffect } from 'react';
import { notification, Button, Progress } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/store/hooks';

const NotificationController: React.FC = () => {
  const { latestNotification } = useAppSelector((state) => state.notification);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (latestNotification) {
      const { key, message, description, type = 'info', duration = 4.5, progress } = latestNotification;

      const closeBtn = (
        <Button 
          type="text" 
          size="small" 
          icon={<CloseCircleOutlined style={{ fontSize: 16 }} />} 
          onClick={() => api.destroy(key)}
        />
      );

      const contentDescription = (
        <div>
          {description && <div style={{ marginBottom: 8 }}>{description}</div>}
          {typeof progress === 'number' && (
            <Progress 
              percent={progress} 
              size="small" 
              status={progress === 100 ? 'success' : 'active'} 
              strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            />
          )}
        </div>
      );

      api.open({
        key: key,
        title: '', 
        message: message,
        description: contentDescription,
        type: type as any,
        duration: typeof progress === 'number' && progress < 100 ? 0 : duration, 
        closeIcon: closeBtn, 
        className: 'custom-notification-class', 
      });
    }
  }, [latestNotification, api]);

  return <>{contextHolder}</>;
};

export default NotificationController;