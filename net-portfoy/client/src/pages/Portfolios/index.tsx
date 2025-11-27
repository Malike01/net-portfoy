import React, { useState } from 'react';
import { MoreOutlined, EditOutlined, DeleteOutlined, FilterOutlined, LinkOutlined, HomeOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Masonry, theme, Dropdown, Input, Select, Popover, Tag, Typography, Tooltip, Avatar, Space } from 'antd';
import { PortfolioForm } from './components/PortfolioForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsPortfolioModalOpen } from '@/store/portfoliosSlice';
import { PORTFOLIO_STATUS_OPTIONS, PORTFOLIO_TYPE_OPTIONS } from '@/constant/Portfolio';
import { truncateText } from '@/utils/stringUtils';

const { Text } = Typography;

type ItemType = {
  key: number;
  column?: number;
  data: {
    height: number;
    title: string;
    status: string;
    price: number;
    currency: string;
    description: string;
    customerType: string;
    imageUrl: string;
    links: {
      sahibinden?: string;
      hepsiemlak?: string;
      emlakjet?: string;
    };
    matchedClients: number;
  };
};

const Portfolios: React.FC = () => {
  const { token } = theme.useToken();
  const [filters, setFilters] = useState({
    searchText: '',
    status: null as string | null,
  });

  const [items, setItems] = useState<ItemType[]>(() =>
    new Array(15).fill(null).map((_, index) => ({
      key: index,
      column: index % 4,
      data: {
        height: Math.floor(Math.random() * (400 - 300 + 1)) + 300,
        title: `Portföy ${index + 1}`,
        status: PORTFOLIO_STATUS_OPTIONS[index % PORTFOLIO_STATUS_OPTIONS.length].value,
        price: Math.floor(Math.random() * 10000000) + 1000000,
        currency: index % 3 === 0 ? 'USD' : 'TRY',
        description: 'Bu portföy harika bir manzaraya sahip, merkezi konumda ve ulaşım araçlarına çok yakın. Yatırım için kaçırılmayacak bir fırsat! Detaylı bilgi için lütfen iletişime geçiniz. Bu alan uzun metinleri test etmek için uzatılmıştır.',
        customerType: PORTFOLIO_TYPE_OPTIONS[index % PORTFOLIO_TYPE_OPTIONS.length].value,
        imageUrl: `https://images.unsplash.com/photo-${index % 2 === 0 ? '1491961865842-98f7befd1a60' : '1560518883-ce09059eeffa'}?w=523&auto=format`,
        links: {
          sahibinden: index % 2 === 0 ? 'https://sahibinden.com' : undefined,
          hepsiemlak: index % 3 === 0 ? 'https://hepsiemlak.com' : undefined,
          emlakjet: index % 4 === 0 ? 'https://emlakjet.com' : undefined,
        },
        matchedClients: Math.floor(Math.random() * 5),
      },
    })),
  );

  const { isPortfolioModalOpen } = useAppSelector((state) => state.portfolios);

  const dispatch = useAppDispatch();

  const removeItem = (removeKey: React.Key) => {
    setItems((prevItems) => prevItems.filter(({ key }) => key !== removeKey));
  };

  const addItem = () => {
    dispatch(setIsPortfolioModalOpen(true));
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.data.title.toLowerCase().includes(filters.searchText.toLowerCase());
    const matchesStatus = filters.status ? item.data.status === filters.status : true;
    return matchesSearch && matchesStatus;
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const content = (
    <div style={{ width: 300 }}>
      <Flex vertical gap={12}>
        <Input
          placeholder="Portföy Ara..."
          value={filters.searchText}
          allowClear
          onChange={(e) => handleFilterChange('searchText', e.target.value)}
        />
        <Select
          style={{ width: '100%' }}
          placeholder="Durum Seçin"
          allowClear
          options={PORTFOLIO_STATUS_OPTIONS}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
        <Button
          onClick={() => setFilters({ searchText: '', status: null })}
          type="link"
          style={{ padding: 0, alignSelf: 'flex-end' }}
        >
          Filtreleri Temizle
        </Button>
      </Flex>
    </div>
  );

  return (
    <Flex vertical gap={16}>
      <Flex justify="flex-end" gap={12}>
        <Popover content={content} title="Filtrele" trigger="click" placement="bottomRight">
          <Button icon={<FilterOutlined />}>Filtrele</Button>
        </Popover>
        <Button onClick={addItem} type="primary">
          Portfoy Ekle
        </Button>
      </Flex>
      <Masonry
        columns={4}
        gutter={16}
        items={filteredItems}
        itemRender={({ data, key }) => (
          <Card
            size="small"
            style={{ height: 'auto', marginBottom: 16 }}
            hoverable
            cover={
              <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <img
                  alt="portfolio"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={data.imageUrl}
                />
                <Tag
                  color={PORTFOLIO_STATUS_OPTIONS.find(s => s.value === data.status)?.color}
                  style={{ position: 'absolute', top: 8, left: 8, margin: 0 }}
                >
                  {PORTFOLIO_STATUS_OPTIONS.find(s => s.value === data.status)?.label}
                </Tag>
              </div>
            }>
            <Flex vertical gap={8}>
              <Flex justify="space-between" align="start">
                <Text strong style={{ fontSize: 16, lineHeight: 1.2 }}>{data.title}</Text>
              </Flex>

              <Flex align="center" gap={4}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {PORTFOLIO_TYPE_OPTIONS.find(t => t.value === data.customerType)?.label}
                </Text>
                <Text type="secondary">•</Text>
                <Text strong style={{ fontSize: 14, color: token.colorPrimary }}>
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: data.currency }).format(data.price)}
                </Text>
              </Flex>

              <Text type="secondary" style={{ fontSize: 12 }}>
                {truncateText(data.description, 80)}
              </Text>

              <Flex justify="space-between" align="center" style={{ marginTop: 8 }}>
                <Space size="small">
                  {data.links.sahibinden && (
                    <Tooltip title="Sahibinden">
                      <Button type="text" size="small" icon={<LinkOutlined style={{ color: '#F9C623' }} />} href={data.links.sahibinden} target="_blank" />
                    </Tooltip>
                  )}
                  {data.links.hepsiemlak && (
                    <Tooltip title="Hepsiemlak">
                      <Button type="text" size="small" icon={<HomeOutlined style={{ color: '#d9232e' }} />} href={data.links.hepsiemlak} target="_blank" />
                    </Tooltip>
                  )}
                  {data.links.emlakjet && (
                    <Tooltip title="Emlakjet">
                      <Button type="text" size="small" icon={<GlobalOutlined style={{ color: '#2ecc71' }} />} href={data.links.emlakjet} target="_blank" />
                    </Tooltip>
                  )}
                </Space>

                {data.matchedClients > 0 && (
                  <Tooltip title={`${data.matchedClients} Eşleşen Müşteri`}>
                    <Flex align="center" gap={4}>
                      <UserOutlined style={{ color: token.colorTextSecondary }} />
                      <Text type="secondary" style={{ fontSize: 12 }}>{data.matchedClients}</Text>
                    </Flex>
                  </Tooltip>
                )}
              </Flex>
            </Flex>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'edit',
                    label: 'Düzenle',
                    icon: <EditOutlined />,
                    onClick: () => {
                      dispatch(setIsPortfolioModalOpen(true));
                    },
                  },
                  {
                    key: 'delete',
                    label: 'Sil',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => removeItem(key),
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button
                style={{
                  position: 'absolute',
                  insetBlockStart: token.paddingSM,
                  insetInlineEnd: token.paddingSM,
                }}
                size="small"
                shape='circle'
                icon={<MoreOutlined style={{color:'white'}}/>}
              />
            </Dropdown>
          </Card>
        )}
        onLayoutChange={(sortedItems) => {
          setItems((prevItems) =>
            prevItems.map((item) => {
              const matchItem = sortedItems.find((sortedItem) => sortedItem.key === item.key);
              return matchItem
                ? {
                  ...item,
                  column: matchItem.column,
                }
                : item;
            }),
          );
        }}
      />
      {isPortfolioModalOpen && (
        <PortfolioForm />
      )
      }
    </Flex>
  );
};

export default Portfolios;