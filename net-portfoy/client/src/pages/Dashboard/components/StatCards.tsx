import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  RiseOutlined 
} from '@ant-design/icons';

export const StatCards: React.FC = () => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card variant='borderless' style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Aktif Portföy"
            value={12}
            prefix={<HomeOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card variant='borderless' style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Toplam Müşteri"
            value={45}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#db8e36' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card variant='borderless' style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Arama Listesi"
            value={7}
            valueStyle={{ color: '#1677ff' }}
            prefix={<PhoneOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card variant='borderless' style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Statistic
            title="Portföy Değeri"
            value={75000}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<RiseOutlined />}
            suffix="₺"
          />
        </Card>
      </Col>
    </Row>
  );
};