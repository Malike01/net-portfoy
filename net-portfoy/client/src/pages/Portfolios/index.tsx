import React, { useEffect, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Flex, Masonry, Input, Select, Popover, Empty, Skeleton } from 'antd';
import { PortfolioForm } from './components/PortfolioForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsPortfolioModalOpen, setLocalPortfolios } from '@/store/portfoliosSlice';
import { PORTFOLIO_STATUS_OPTIONS } from '@/constant/Portfolio';
import { CustomerForm } from '../Customers/components/CustomerForm';
import { getCustomers } from '@/services/customerService';
import PortfolioCard from './components/PortfolioCard';
import { fetchPortfolios } from '@/services/portfolioService';
import { useNavigate } from 'react-router-dom';
import styles from './Portfolios.module.css';

const Portfolios: React.FC = () => {
  const [filters, setFilters] = useState({
    searchText: '',
    status: null as string | null,
  });

  const { items: portfolios, isLoading } = useAppSelector((state) => state.portfolios);

  const { isPortfolioModalOpen } = useAppSelector((state) => state.portfolios);
  const { isCustomerModalOpen } = useAppSelector((state) => state.customers);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addItem = () => {
    dispatch(setIsPortfolioModalOpen(true));
    navigate('/portfolios/new');
  };

  const filteredItems: any = portfolios.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(filters.searchText.toLowerCase());
    const matchesStatus = filters.status ? item.status === filters.status : true;
    return matchesSearch && matchesStatus;
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(fetchPortfolios());
  }, []);

  const handleLayoutChange = (sortedItems: any[]) => {
    const currentItems = [...portfolios];

    const newItems = currentItems.map((item) => {
      const itemId = item._id || item._id;

      const matchItem = sortedItems.find((sortedItem) => sortedItem.key === itemId);

      return matchItem
        ? {
          ...item,
          column: matchItem.column,
        }
        : item;
    });

    dispatch(setLocalPortfolios(newItems));
  };

  const content = (
    <div className={styles.filterContainer}>
      <Flex vertical gap={12}>
        <Input
          placeholder="Portföy Ara..."
          value={filters.searchText}
          allowClear
          onChange={(e) => handleFilterChange('searchText', e.target.value)}
        />
        <Select
          className={styles.fullWidth}
          placeholder="Durum Seçin"
          allowClear
          options={PORTFOLIO_STATUS_OPTIONS}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
        <Button
          onClick={() => setFilters({ searchText: '', status: null })}
          type="link"
          className={styles.clearFilterButton}
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
      {isLoading && <Skeleton active />}
      {!isLoading && portfolios.length === 0 && <Empty description="Gösterilecek portföy bulunamadı." />}
      <Masonry
        columns={4}
        gutter={16}
        items={filteredItems}
        itemRender={(item) => (
          <PortfolioCard
            data={item}
          />
        )}
        onLayoutChange={(sortedItems) => {
          handleLayoutChange(sortedItems)
        }}
      />
      {isPortfolioModalOpen && <PortfolioForm />}
      {isCustomerModalOpen && <CustomerForm />}
    </Flex>
  );
};

export default Portfolios;