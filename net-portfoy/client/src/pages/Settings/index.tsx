import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Alert, Typography, message } from 'antd';
import { PhoneOutlined, SaveOutlined, SafetyCertificateOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateProfile } from '@/store/authSlice';

const { Text } = Typography;

interface SettingsModalProps {
  open: boolean;
  onCancel: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onCancel }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    }
  }, [open, user, form]);

  const handleFinish = async (values: { phone: string }) => {
    if (values.phone !== user?.phone) {
      await dispatch(updateProfile({ phone: values.phone }));
      message.success('Profil başarıyla güncellendi. Lütfen telefonunuzu tekrar doğrulayın.');
      onCancel(); 
    } else {
      onCancel();
    }
  };

  return (
    <Modal
      title="Hesap Ayarları"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      destroyOnClose
    >
      <Alert
        message="Önemli Bilgi"
        description="Telefon numaranızı güncellediğinizde, hesabınızı tekrar doğrulamanız gerekecektir."
        type="warning"
        showIcon
        className="mb-6"
        style={{ marginBottom: 24 }}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item label="Ad Soyad" name="name" style={{ flex: 1 }}>
            <Input prefix={<UserOutlined />} disabled className="bg-gray-50" />
          </Form.Item>
          
          <Form.Item label="E-Posta" name="email" style={{ flex: 1 }}>
            <Input prefix={<MailOutlined />} disabled className="bg-gray-50" />
          </Form.Item>
        </div>

        <Form.Item
          label="Telefon Numarası"
          name="phone"
          rules={[
            { required: true, message: 'Telefon numarası gereklidir' },
            { min: 10, message: 'Geçerli bir numara giriniz' }
          ]}
          help="Numarayı değiştirmek için burayı düzenleyin."
        >
          <Input 
            prefix={<PhoneOutlined className="text-gray-400" />} 
            placeholder="5XX XXX XX XX" 
            size="large"
            addonAfter={user?.isPhoneVerified ? <SafetyCertificateOutlined className="text-green-500" /> : <span className="text-red-500 text-xs">Doğrulanmadı</span>}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
          <Button onClick={onCancel}>İptal</Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />} 
            loading={isLoading}
          >
            Değişiklikleri Kaydet
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SettingsModal;