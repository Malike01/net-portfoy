import React from 'react';
import { Row, Col } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import styles from './StatCards.module.css';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend: string;
  trendUp: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend, trendUp }) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <div
        className={styles.iconBox}
        style={{
          background: `${color}15`,
          color: color,
        }}
      >
        {icon}
      </div>
      <div
        className={styles.trendBadge}
        style={{
          background: trendUp ? '#f6ffed' : '#fff1f0',
          color: trendUp ? '#52c41a' : '#cf1322',
        }}
      >
        {trendUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        {trend}
      </div>
    </div>
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  </div>
);

export const StatCards: React.FC = () => {
  return (
    <Row gutter={[24, 24]} className={styles.row}>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Portföy Değeri"
          value="₺45.2M"
          icon={<DollarCircleOutlined />}
          color="#1890ff"
          trend="12%"
          trendUp={true}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Aktif Portföy"
          value="12"
          icon={<HomeOutlined />}
          color="#722ed1"
          trend="4"
          trendUp={true}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Toplam Müşteri"
          value="24"
          icon={<TeamOutlined />}
          color="#fa8c16"
          trend="2"
          trendUp={false}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Bu Ay Satılan"
          value="3"
          icon={<CheckCircleOutlined />}
          color="#52c41a"
          trend="1"
          trendUp={true}
        />
      </Col>
    </Row>
  );
};