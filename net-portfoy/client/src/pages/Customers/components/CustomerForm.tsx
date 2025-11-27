import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Radio } from 'antd';
import { CustomerItem } from '@/types/type';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from '@/constant/Customers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import dayjs from 'dayjs';

interface CustomerFormProps {
  initialValues?: CustomerItem | null;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  const { isCustomerModalOpen } = useAppSelector((state) => state.customers);

  const status = Form.useWatch('status', form);
  
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    if (isCustomerModalOpen) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
        form.setFieldValue('status', 'Aktif');
      }
    }
  }, [open, initialValues, form]);

  const handleFinish = (values: any) => {
    const selectedPortfolio = [{ id: 1, title: 'Portföy 1' }].find(p => p.id === values.portfolioId);
    const formattedValues = {
        ...values,
        portfolioTitle: selectedPortfolio ? selectedPortfolio.title : undefined
    };
    // onSubmit(formattedValues);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Modal
      title={initialValues ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}
      open={isCustomerModalOpen}
      onCancel={() => {
        dispatch(setIsCustomerModalOpen(false))
        form.resetFields();
        }
      }
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Ad Soyad" rules={[{ required: true, message: 'İsim zorunludur' }]}>
          <Input placeholder="Müşteri Adı" maxLength={20} />
        </Form.Item>
        <Form.Item name="customerType" label="Müşteri Tipi" rules={[{ required: true }]}>
            <Radio.Group
              block
              options={CUSTOMER_TYPE_OPTIONS}
              defaultValue="buyer"
              optionType="button"
              buttonStyle="solid"
            />
        </Form.Item>
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="phone" label="Telefon" style={{ flex: 1 }} rules={[{ required: true, pattern: /^05\d{9}$/ }]}>
             <Input placeholder="05XX XXX XX XX" />
          </Form.Item>
          <Form.Item name="status" label="Durum" style={{ flex: 1 }}>
             <Select showSearch={{ optionFilterProp: 'label', onSearch }} mode="multiple" options={CUSTOMER_STATUS_OPTIONS} />
          </Form.Item>
        </div>
        {
          status?.includes('to_call') && (
            <Form.Item name="callDate" label="Arama Tarihi" initialValue={dayjs().format('YYYY-MM-DD')}>
              <Input type="date"/>
            </Form.Item>
          )
        }

        <Form.Item name="email" label="E-Posta" rules={[{ type: 'email', message: 'Geçersiz e-posta adresi' }]}>
          <Input type="email" placeholder="ornek@mail.com" />
        </Form.Item>
        <Form.Item name="portfolioId" label="İlgilendiği Portföy (Eşleştir)">
          <Select 
            allowClear
            mode="multiple"
            showSearch={{ optionFilterProp: 'label', onSearch }}
            placeholder="Bir portföy seçin..."
            options={[{ title: 'Portföy 1', id: 1 }].map(p => ({ label: p.title, value: p.id }))}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <Button onClick={()=> dispatch(setIsCustomerModalOpen(false))}>İptal</Button>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};