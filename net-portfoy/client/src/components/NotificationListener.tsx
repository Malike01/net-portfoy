import React, { useEffect, useRef } from 'react';
import { notification, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { fetchDbNotifications, markNotificationRead } from '@/services/notificationService';

const NotificationListener: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.notification);
  const { stats } = useAppSelector((state) => state.dashboard);
  
  const displayedRefs = useRef<Set<string>>(new Set()); 

  useEffect(() => {
    dispatch(fetchDbNotifications());
  }, [stats]);

  useEffect(() => {
    items.forEach((item) => {
      if (!item.isRead && !displayedRefs.current.has(item._id)) {
        
        displayedRefs.current.add(item._id);

        notification.open({
          message: item.title,
          title: item.title,
          description: item.message,
          type: item.type === 'system' ? 'info' : item.type,
          duration: 6,
          onClick: () => {
            if (item.relatedId) navigate(item.relatedId);
            dispatch(markNotificationRead(item._id));
          },
          btn: (
            <Button 
              type="primary" 
              size="small" 
              onClick={() => dispatch(markNotificationRead(item._id))}
            >
              Okundu
            </Button>
          )
        });
      }
    });
  }, [items, dispatch, navigate]);

  return null;
};

export default NotificationListener;