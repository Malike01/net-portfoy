import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Input, Statistic, message } from 'antd';
import { SafetyCertificateOutlined, PhoneOutlined} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { verifyPhoneAction } from '@/store/authSlice';
import api from '@/services/api';

const { Title, Text } = Typography;
const { Countdown } = Statistic;

interface PhoneVerificationModalProps {
  open: boolean;
  onClose: () => void; 
}

const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState(user?.phone || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(0);

  useEffect(() => {
    if (open && user) {
      if (user.phone) {
        setPhone(user.phone);
        setStep('otp'); 
      } else {
        setStep('phone'); 
      }
    }
  }, [open, user]);

  const handleSendCode = async () => {
    if (!phone) return message.error('Lütfen telefon numarası giriniz');
    setLoading(true);
    try {
      await api.post('/auth/resend-code', { phone });
      message.success('Doğrulama kodu gönderildi');
      setStep('otp');
      setDeadline(Date.now() + 1000 * 60 * 2);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    const result = await dispatch(verifyPhoneAction(otp));
    setLoading(false);
    
    if (verifyPhoneAction.fulfilled.match(result)) {
      onClose(); 
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose} 
      footer={null}
      width={400}
      centered
      styles={{body:{padding:10}}}
    >
      <div className="flex flex-col items-center text-center p-4">
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', textAlign:'center'}}>
          <SafetyCertificateOutlined style={{fontSize:20}} />
          <Title level={4}>Hesap Doğrulama</Title>
        </div>
        <Text type="secondary" className="mb-6 block">
          {step === 'phone' 
            ? 'Güvenliğiniz için lütfen telefon numaranızı ekleyin.' 
            : `+90...${phone.slice(-4)} numarasına gelen kodu giriniz.`}
        </Text>

        {step === 'phone' && (
          <>
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="5XX XXX XX XX" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              size="large"
              className="mb-4"
              style={{margin:'6px 0px'}}
            />
            <Button type="primary" block size="large" onClick={handleSendCode} loading={loading}>
              Kod Gönder
            </Button>
          </>
        )}

        {step === 'otp' && (
          <>
            <Input.OTP 
              length={6} 
              value={otp} 
              onChange={(val) => setOtp(val)} 
              size="large"
              className="mb-6"
            />
            <Button 
              type="primary" 
              block 
              size="large" 
              onClick={handleVerify}
              loading={loading}
              disabled={otp.length !== 6}
            >
              Doğrula
            </Button>
            
            <div className="mt-4 text-sm text-gray-500">
               <Countdown 
                 value={deadline} 
                 format="mm:ss" 
                 onFinish={() => {}} 
                 valueStyle={{ fontSize: 14 }}
                 prefix="Kalan Süre:"
               />
               <Button type="link" size="small" onClick={handleSendCode} className="mt-2">
                 Tekrar Gönder / Numara Değiştir
               </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PhoneVerificationModal;