import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, Space, Typography, Popconfirm, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, UserOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers, addUser, deleteUser, UserType } from '@/store/usersSlice';
import { REGEX } from '@/constant/General';

const { Title } = Typography;

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: users, loading } = useAppSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = async (values: any) => {
    await dispatch(addUser(values));
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Ad Soyad',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Space><UserOutlined className="text-blue-500" /> <span className="font-medium">{text}</span></Space>
    },
    {
      title: 'E-Posta',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => phone || '-'
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'} icon={role === 'admin' ? <SafetyCertificateOutlined /> : <TeamOutlined />}>
          {role === 'admin' ? 'Yönetici' : 'Danışman'}
        </Tag>
      )
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (_: any, record: UserType) => (
        <Popconfirm 
          title="Personeli silmek istediğinize emin misiniz?" 
          description="Bu işlem geri alınamaz."
          onConfirm={() => dispatch(deleteUser(record._id))}
          okText="Evet, Sil"
          cancelText="İptal"
          okType="danger"
        >
          <Button danger type="text" icon={<DeleteOutlined />} />
        </Popconfirm>
      )
    }
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ margin: 0 }}>Personel Yönetimi</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Yeni Personel Ekle
        </Button>
      </div>

      <Card className="shadow-sm" bodyStyle={{ padding: 0 }}>
        <Table 
          columns={columns} 
          dataSource={users} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>

      <Modal
        title="Yeni Personel Oluştur"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddUser} requiredMark={false}>
          <Form.Item name="name" label="Ad Soyad" rules={[{ required: true, message: 'Zorunlu' }]}>
            <Input placeholder="Örn: Mehmet Yılmaz" />
          </Form.Item>
          
          <Form.Item name="email" label="E-Posta" rules={[{ required: true, type: 'email', message: 'Geçerli bir mail girin' }]}>
            <Input placeholder="personel@sirket.com" />
          </Form.Item>
          
          <div style={{ display: 'flex', gap: 16 }}>
            <Form.Item name="password" label="Şifre" style={{ flex: 1 }} rules={[{ required: true, min: 6 }]}>
              <Input.Password placeholder="******" />
            </Form.Item>
            
            <Form.Item name="role" label="Yetki Rolü" style={{ flex: 1 }} initialValue="agent">
              <Select options={[
                { label: 'Danışman', value: 'agent' },
                { label: 'Yönetici (Admin)', value: 'admin' }
              ]} />
            </Form.Item>
          </div>

          <Form.Item name="phone" label="Telefon Numarası" rules={[{ pattern: REGEX.PHONE, message: 'Geçerli bir telefon numarası girin' }]}>
            <Input placeholder="5XX XXX XX XX" />
          </Form.Item>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
             <Button onClick={() => setIsModalOpen(false)} style={{ marginRight: 8 }}>İptal</Button>
             <Button type="primary" htmlType="submit">Kaydet</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;