import React from 'react';
import { Typography, Row, Col, Card, Statistic, Divider } from 'antd';
import { ArrowUpOutlined, UserOutlined, HomeOutlined, PhoneOutlined, RiseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>Anasayfa</Title>
      <Divider/>
      <Row gutter={16} className="mt-6">
        <Col span={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Aktif Portföy"
              value={12}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Toplam Müşteri"
              value={45}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#db8e36ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Arama Listesi"
              value={7}
              precision={2}
              valueStyle={{ color: '#1677ff' }}
              prefix={<PhoneOutlined />}
            />
          </Card>
        </Col>
          <Col span={6}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Portfoy Değeri"
              value={75.000}
              precision={5}
              valueStyle={{ color: '#cf1322' }}
              prefix={<RiseOutlined />}
              suffix="₺"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;