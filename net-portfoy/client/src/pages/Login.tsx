import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, setCredentials } from '../store/authSlice';
import api from '../services/api';
import { Form, Input, Button, Card, Alert, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, HomeTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useAppSelector((state) => state.auth);


  const onFinish = (values: any) => {
     dispatch(login({ email: values.email, password: values.password }));
  };
  
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
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

        {isError && (
          <Alert
            message="Giriş Hatası"
            description={
              message || 
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
              loading={isLoading}
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