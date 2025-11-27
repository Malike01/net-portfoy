import React, { useState } from 'react';
import { Typography, Table, Button, Input, Tag, Space, Modal, message, FloatButton, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { CustomerForm } from './components/CustomerForm';
import { CustomerItem } from '@/types/type';
import { useAppDispatch } from '@/store/hooks';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import { CUSTOMER_STATUS_OPTIONS } from '@/constant/Customers';

const { Title, Text } = Typography;

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<CustomerItem | null>(null);

  const dispatch = useAppDispatch(); 

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const handleFormSubmit = (values: any) => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...values, id: editingCustomer.id } : c));
      message.success('Müşteri güncellendi');
    } else {
      const newCustomer = { ...values, id: Date.now() };
      setCustomers([newCustomer, ...customers]);
      message.success('Müşteri eklendi');
    }
    dispatch(setIsCustomerModalOpen(false));
    setEditingCustomer(null);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Silmek istediğinize emin misiniz?',
      content: 'Bu işlem geri alınamaz.',
      okType: 'danger',
      onOk: () => {
        setCustomers(customers.filter(c => c.id !== id));
        message.success('Müşteri silindi');
      }
    });
  };

  const columns = [
    {
      title: 'Müşteri',
      key: 'name',
      render: (_: any, record: CustomerItem) => (
        <Space>
          <Avatar style={{ backgroundColor: '#2563eb' }} icon={<UserOutlined />} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong>{record.name}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      ),
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
                setEditingCustomer(record); 
                dispatch(setIsCustomerModalOpen(true)); 
                handleFormSubmit(record);
            }} 
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)} 
          />
        </Space>
      ),
    },
  ];

  return (
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingCustomer(null); dispatch(setIsCustomerModalOpen(true)); }}>
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
      />

      <CustomerForm 
        initialValues={editingCustomer}
      />
      
      <FloatButton 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => { setEditingCustomer(null); dispatch(setIsCustomerModalOpen(true)); }}
        style={{ right: 24, bottom: 24 }}
      />
    </div>
  );
};

export default Customers;