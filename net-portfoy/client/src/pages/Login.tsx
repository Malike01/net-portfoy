import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/authSlice';
import api from '../services/api';
import { Form, Input, Button, Card, Alert, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, HomeTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage(); 

  const loginMutation = useMutation({
    mutationFn: async (values: any) => {
      const response = await api.post('/auth/login', values);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      messageApi.success('Giriş başarılı, yönlendiriliyorsunuz...');
      setTimeout(() => navigate('/'), 500); 
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const onFinish = (values: any) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      {contextHolder}
      
      <Card 
        className="w-full max-w-md shadow-xl border-0" 
        styles={{ body: { padding: '2rem' } }}
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="p-3 bg-blue-50 rounded-full mb-3">
             <HomeTwoTone style={{ fontSize: '32px' }} twoToneColor="#2563eb"/>
          </div>
          <Title level={3} style={{ margin: 0, color: '#1f2937' }}>NetPortfoy</Title>
          <Text type="secondary">Portföy ve Müşteri Yönetim Paneli</Text>
        </div>

        {loginMutation.isError && (
          <Alert
            message="Giriş Hatası"
            description={
              (loginMutation.error as any)?.response?.data?.message || 
              "Sunucuya bağlanılamadı."
            }
            type="error"
            showIcon
            className="mb-6"
          />
        )}

        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          size="large"
          autoComplete="off"
        >
          <Form.Item
            label="E-Posta Adresi"
            name="email"
            rules={[
              { required: true, message: 'Lütfen e-posta adresinizi girin!' },
              { type: 'email', message: 'Geçerli bir e-posta giriniz!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="ornek@emlak.com" 
            />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />} 
              placeholder="••••••" 
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loginMutation.isPending}
              className="mt-2"
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        
        <div className="text-center mt-4">
          <Text type="secondary" style={{ fontSize: '12px' }}>
            © 2025 NetPortfoy CRM Sistemi
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;