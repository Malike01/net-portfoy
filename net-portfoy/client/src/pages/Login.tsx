import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/authSlice';
import { Form, Input, Button, Card, Alert, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, HomeTwoTone } from '@ant-design/icons';
import styles from './Login.module.css';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useAppSelector((state) => state.auth);


  const onFinish = (values: any) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Card
        className={styles.card}
        bordered={false}
      >
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <HomeTwoTone className={styles.icon} twoToneColor="#2563eb" />
          </div>
          <Title level={3} className={styles.title}>NetPortfoy</Title>
          <Text type="secondary" className={styles.subtitle}>Portföy ve Müşteri Yönetim Paneli</Text>
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
            className={styles.alert}
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
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="ornek@emlak.com"
            />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="••••••"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              className={styles.submitButton}
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <Text type="secondary" className={styles.footerText}>
            © 2025 NetPortfoy CRM Sistemi
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;