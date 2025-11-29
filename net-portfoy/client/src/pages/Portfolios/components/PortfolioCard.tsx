import { PORTFOLIO_STATUS_OPTIONS, PORTFOLIO_TYPE_OPTIONS } from '@/constant/Portfolio';
import { deletePortfolio } from '@/services/portfolioService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsPortfolioModalOpen } from '@/store/portfoliosSlice';
import { truncateText } from '@/utils';
import { DeleteOutlined, EditOutlined, GlobalOutlined, HomeOutlined, LinkOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Flex, Space, Tag, theme, Tooltip, Typography } from 'antd';
import React from 'react'
import logoCover from '../../../../public/logoCover.png';
import styles from './PortfolioCard.module.css';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

type PortfolioCardProps = {
    data: any;
}

function PortfolioCard(props: PortfolioCardProps) {
    const { token } = theme.useToken();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { customers } = useAppSelector((state) => state.customers);
    
    const removeItem = (removeKey: React.Key) => {
        dispatch(deletePortfolio(removeKey as number));
    };

    return (
        <Card
            className={styles.card}
            size="small"
            style={{ height: 'auto', marginBottom: 16 }}
            hoverable
            cover={
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                    <img
                        alt="portfolio"
                        className={styles.portfolioImage}
                        src={props.data?.imageUrl ? props.data?.imageUrl : logoCover}
                    />
                    <Tag
                        color={PORTFOLIO_STATUS_OPTIONS.find(s => s.value === props.data?.status)?.color}
                        style={{ position: 'absolute', top: 8, left: 8, margin: 0 }}
                    >
                        {PORTFOLIO_STATUS_OPTIONS.find(s => s.value === props.data?.status)?.label}
                    </Tag>
                </div>
            }>
            <Flex vertical gap={8}>
                <Flex justify="space-between" align="start">
                    <Text strong style={{ fontSize: 16, lineHeight: 1.2, flex: 1 }}>{props.data?.title}</Text>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: 'edit',
                                    label: 'Düzenle',
                                    icon: <EditOutlined />,
                                    onClick: () => {
                                        dispatch(setIsPortfolioModalOpen(true));
                                        navigate(`/portfolios/${props.data?._id || ''}`);
                                    },
                                },
                                {
                                    key: 'delete',
                                    label: 'Sil',
                                    icon: <DeleteOutlined />,
                                    danger: true,
                                    onClick: () => removeItem(props.data?._id || ''),
                                },
                            ],
                        }}
                        trigger={['click']}
                    >
                        <Button
                            className={styles.actionButton}
                            size="small"
                            type="text"
                            icon={<MoreOutlined style={{ fontSize: '18px' }} />}
                        />
                    </Dropdown>
                </Flex>

                <Flex align="center" gap={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {PORTFOLIO_TYPE_OPTIONS.find(t => t.value === props.data?.portfolioType)?.label}
                    </Text>
                    <Text type="secondary">•</Text>
                    <Text strong style={{ fontSize: 14, color: token.colorPrimary }}>
                        {props.data?.currency &&
                            new Intl.NumberFormat('tr-TR', { style: 'currency', currency: props.data?.currency === 'TL' ? 'TRY' : props.data?.currency, }).format(props.data?.price)}
                    </Text>
                </Flex>

                <Text type="secondary" style={{ fontSize: 12 }}>
                    {truncateText(props.data?.description, 80)}
                </Text>

                <Flex justify="space-between" align="center" style={{ marginTop: 8 }}>
                    <Space size="small">
                        {props.data?.externalLinks?.sahibinden && (
                            <Tooltip title="Sahibinden">
                                <Button type="text" size="small" icon={<LinkOutlined style={{ color: '#F9C623' }} />} href={props.data?.externalLinks?.sahibinden} target="_blank" />
                            </Tooltip>
                        )}
                        {props.data?.externalLinks?.hepsiemlak && (
                            <Tooltip title="Hepsiemlak">
                                <Button type="text" size="small" icon={<HomeOutlined style={{ color: '#d9232e' }} />} href={props.data?.externalLinks?.hepsiemlak} target="_blank" />
                            </Tooltip>
                        )}
                        {props.data?.externalLinks?.emlakjet && (
                            <Tooltip title="Emlakjet">
                                <Button type="text" size="small" icon={<GlobalOutlined style={{ color: '#2ecc71' }} />} href={props.data?.externalLinks?.emlakjet} target="_blank" />
                            </Tooltip>
                        )}
                    </Space>

                    {props.data?.matchedCustomers.length > 0 && (
                        <Tooltip title={`${ customers.find(c => props.data?.matchedCustomers?.includes(c._id))?.name} Eşleşen Müşteri`}>
                            <Flex align="center" gap={4}>
                                <UserOutlined style={{ color: token.colorTextSecondary}} />
                                <Text type="secondary" style={{ fontSize: 12 }}>{
                                    props.data?.matchedCustomers.length
                                }
                                </Text>
                            </Flex>
                        </Tooltip>
                    )}
                </Flex>
            </Flex>
        </Card>
    )
}

export default PortfolioCard