import React, { useEffect, useState } from 'react';
import { Typography, Table, Button, Input, Tag, Space, Modal, FloatButton, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { CustomerForm } from './components/CustomerForm';
import { CustomerItem } from '@/types/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from '@/constant/Customers';
import { deleteCustomer, getCustomers } from '@/services/customerService';
import { useNavigate } from 'react-router-dom';

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
      onOk: () => {
        dispatch(deleteCustomer(id));
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Text strong>{record.name}</Text>
                {typeOption && (
                  <Tag 
                    color={typeOption.color} 
                    style={{ 
                      margin: 0, 
                      fontSize: 14, 
                      lineHeight: '18px', 
                      padding: '12 12px', 
                      borderRadius: 12, 
                      border: 'none',
                      fontWeight: 500
                    }}
                  >
                    {typeOption.label}
                  </Tag>
                )}
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
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
            <Tag icon={<HomeOutlined />} color="blue" style={{ cursor: 'pointer' }}>
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
      <div style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <Title level={2} style={{ margin: 0 }}>Müşteriler</Title>
          <div style={{ display: 'flex', gap: 12 }}>
              <Input 
                  placeholder="İsim veya telefon ara..." 
                  prefix={<SearchOutlined />} 
                  style={{ width: 250 }}
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
          style={{ right: 24, bottom: 24 }}
        />
        { isCustomerModalOpen && <CustomerForm /> }
      </div>
    </>
  );
};

export default Customers;