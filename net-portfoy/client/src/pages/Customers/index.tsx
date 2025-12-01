import React, { useEffect, useState } from 'react';
import { Typography, Table, Button, Input, Tag, Space, Modal, FloatButton, Avatar, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { CustomerForm } from './components/CustomerForm';
import { CustomerItem } from '@/types/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from '@/constant/Customers';
import { deleteCustomer, getCustomers } from '@/services/customerService';
import { useNavigate } from 'react-router-dom';
import styles from './Customers.module.css';

const { Title, Text } = Typography;

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { customers, isLoading, isCustomerModalOpen } = useAppSelector((state) => state.customers);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );


  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Silmek istediğinize emin misiniz?',
      content: 'Bu işlem geri alınamaz.',
      okType: 'danger',
      onOk: async () => {
        try {
          await dispatch(deleteCustomer(id)).unwrap();
          message.success('Müşteri başarıyla silindi.');
        } catch (error) {
          message.error('Müşteri silinirken bir hata oluştu.');
        }
      }
    });
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const columns = [
    {
      title: 'Müşteri',
      key: 'name',
      render: (_: any, record: CustomerItem) => {
        const typeOption = CUSTOMER_TYPE_OPTIONS.find(opt => opt.value === record.customerType);
        return (
          <Space>
            <Avatar
              style={{ backgroundColor: typeOption?.color || '#2563eb' }}
              icon={record.customerType === 'seller' ? <ShopOutlined /> : <UserOutlined />}
            />
            <div className={styles.customerInfo}>
              <div className={styles.nameContainer}>
                <Text strong>{record.name}</Text>
                {typeOption && (
                  <Tag
                    color={typeOption.color}
                    className={styles.tag}
                  >
                    {typeOption.label}
                  </Tag>
                )}
              </div>
              <Text type="secondary" className={styles.email}>{record.email}</Text>
            </div>
          </Space>
        );
      },
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = CUSTOMER_STATUS_OPTIONS.find(s => s.value === status);
        return (
          <Tag color={statusConfig?.color || 'default'}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'İlgilendiği Portföy',
      key: 'portfolio',
      render: (_: any, record: CustomerItem) => (
        record.portfolioTitle ? (
          <Tag icon={<HomeOutlined />} color="blue" className={styles.portfolioTag}>
            {record.portfolioTitle}
          </Tag>
        ) : <Text type="secondary">-</Text>
      )
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_: any, record: CustomerItem) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              navigate(`/customers/${(record as any)._id || record._id}`)
              dispatch(setIsCustomerModalOpen(true));
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete((record as any)._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>Müşteriler</Title>
          <div className={styles.actions}>
            <Input
              placeholder="İsim veya telefon ara..."
              prefix={<SearchOutlined />}
              className={styles.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
              navigate('/customers/new');
              dispatch(setIsCustomerModalOpen(true));
            }}>
              Müşteri Ekle
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          scroll={{ x: 600 }}
          loading={isLoading}
        />
        <FloatButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/customers/new')
            dispatch(setIsCustomerModalOpen(true));
          }}
          className={styles.floatButton}
        />
        {isCustomerModalOpen && <CustomerForm />}
      </div>
    </>
  );
};

export default Customers;