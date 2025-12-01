import React from 'react';
import { Button, Card, Result, Tag, Typography } from 'antd';
import { LockOutlined, ClockCircleOutlined, GiftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import api from '@/services/api';

import dayjs from 'dayjs';
import { updateUserFeatures } from '@/store/authSlice';

const { Text } = Typography;

interface FeatureGuardProps {
  featureKey: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ featureKey, title, description, children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const userFeature = user?.features?.find(f => f.featureKey === featureKey);
  
  let accessStatus: 'locked' | 'trial' | 'active' | 'expired' = 'locked';
  let daysLeft = 0;

  if (userFeature) {
    if (userFeature.status === 'active') {
      accessStatus = 'active';
    } else if (userFeature.status === 'trial') {
      const startDate = dayjs(userFeature.trialStartDate);
      const now = dayjs();
      const diff = now.diff(startDate, 'day', true); 
      
      if (diff < 3) {
        accessStatus = 'trial';
        daysLeft = 3 - Math.floor(diff);
      } else {
        accessStatus = 'expired';
      }
    }
  }

  const handleStartTrial = async () => {
    try {
      const res = await api.post('/features/start-trial', { featureKey });
      dispatch(updateUserFeatures(res.data.features));
    } catch (err: any) {
    }
  };

  const handlePurchase = async () => {
    try {
      const res = await api.post('/features/purchase', { featureKey });
      dispatch(updateUserFeatures(res.data.features));
    } catch (err) {
    }
  };

  if (accessStatus === 'locked') {
    return (
      <Result
        icon={<GiftOutlined style={{ color: '#2563eb' }} />}
        title={`Yeni Özellik: ${title}`}
        subTitle={description}
        extra={
          <Button type="primary" size="large" onClick={handleStartTrial}>
            3 Gün Ücretsiz Dene
          </Button>
        }
      />
    );
  }

  if (accessStatus === 'expired') {
    return (
      <Result
        status="warning"
        icon={<LockOutlined />}
        title="Deneme Süreniz Sona Erdi"
        subTitle={`${title} özelliğini kullanmaya devam etmek için paketi satın almalısınız.`}
        extra={
          <Button type="primary" size="large" onClick={handlePurchase}>
            Satın Al ve Devam Et
          </Button>
        }
      />
    );
  }

  return (
    <div className="relative border border-gray-200 rounded-lg p-4">
      {accessStatus === 'trial' && (
        <div className="flex justify-between items-center bg-blue-50 p-2 rounded-md mb-4 border border-blue-100">
          <div className="flex items-center gap-2 text-blue-600">
            <ClockCircleOutlined />
            <Text strong className="text-blue-600">Deneme Sürümü</Text>
          </div>
          <div className="flex items-center gap-3">
            <Text className="text-xs text-gray-500">Kalan Süre: {daysLeft} Gün</Text>
            <Button size="small" type="primary" ghost onClick={handlePurchase}>Şimdi Satın Al</Button>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default FeatureGuard;