import React from 'react';
import { Row, Col, Tag } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined
} from '@ant-design/icons';
import styles from './StatCards.module.css';
import { useAppSelector } from '@/store/hooks';
import { formatCurrency } from '@/utils';
import { STAT_CARD_CONFIG, TREND_COLORS } from '@/constant/Dashboard';

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
          background: trendUp ? TREND_COLORS.UP_BG : TREND_COLORS.DOWN_BG,
          color: trendUp ? TREND_COLORS.UP_TEXT : TREND_COLORS.DOWN_TEXT,
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
  const { stats } = useAppSelector((state) => state.dashboard);
  const kpi = stats && stats.kpi || null;
  const trends = stats && stats?.kpi?.trends || null

  const renderTrendTag = (value: number, isPercent: boolean = false) => {
    if (value === 0) {
      return <Tag color="default" icon={<MinusOutlined />}>0</Tag>;
    }

    const isPositive = value > 0;
    const color = isPositive ? 'success' : 'error';
    const icon = isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
    return (
      <Tag color={color} icon={icon}>
        {isPercent ? '%' : ''}
      </Tag>
    );
  };

  return (
    <Row gutter={[24, 24]} className={styles.row}>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title={STAT_CARD_CONFIG.TOTAL_VALUE.title}
          value={formatCurrency(kpi?.totalValue || 0)}
          icon={<DollarCircleOutlined />}
          color={STAT_CARD_CONFIG.TOTAL_VALUE.color}
          trend={renderTrendTag(trends?.value || 0, true) as unknown as string}
          trendUp={true}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title={STAT_CARD_CONFIG.ACTIVE_PORTFOLIO.title}
          value={kpi?.activePortfolios.toString() || "0"}
          icon={<HomeOutlined />}
          color={STAT_CARD_CONFIG.ACTIVE_PORTFOLIO.color}
          trend={renderTrendTag(trends?.portfolio || 0) as unknown as string}
          trendUp={true}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title={STAT_CARD_CONFIG.TOTAL_CUSTOMERS.title}
          value={kpi?.totalCustomers.toString() || "0"}
          icon={<TeamOutlined />}
          color={STAT_CARD_CONFIG.TOTAL_CUSTOMERS.color}
          trend={renderTrendTag(trends?.customer || 0) as unknown as string}
          trendUp={false}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title={STAT_CARD_CONFIG.SOLD_THIS_MONTH.title}
          value={kpi?.soldThisMonth.toString() || "0"}
          icon={<CheckCircleOutlined />}
          color={STAT_CARD_CONFIG.SOLD_THIS_MONTH.color}
          trend={renderTrendTag(trends?.sales || 0) as unknown as string}
          trendUp={true}
        />
      </Col>
    </Row>
  );
};