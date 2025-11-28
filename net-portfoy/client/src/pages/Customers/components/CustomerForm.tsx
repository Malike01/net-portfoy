import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Radio } from 'antd';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from '@/constant/Customers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import dayjs from 'dayjs';
import { createCustomer, updateCustomer } from '@/services/customerApi';
import { useParams } from 'react-router-dom';


export const CustomerForm: React.FC = () => {
  const [form] = Form.useForm();

  const { isCustomerModalOpen, customers } = useAppSelector((state) => state.customers);

  const status = Form.useWatch('status', form);
  
  const dispatch = useAppDispatch(); 

  const { id } = useParams(); 
  const isEditMode = !!id;

  useEffect(() => {
    if (isCustomerModalOpen) {
      if (isEditMode) {
        const formValues = customers.find(c => c._id === id);
        form.setFieldsValue({...formValues, portfolioId:formValues?.portfolioTitle});
      } else {
        form.resetFields();
      }
    }
  }, [open, isEditMode, form]);

  const handleFinish = async(values: any) => {
    console.log('Form Values:', values);
    const selectedPortfolio = [{ id: 1, title: 'Portföy 1' }].find(p => values.portfolioId?.includes(p.id));
    const formattedValues = {
        ...values,
        portfolioTitle: selectedPortfolio ? selectedPortfolio.title : undefined,
        portfolioId: selectedPortfolio ? [selectedPortfolio.id.toString()] : undefined,
    };

    if(isEditMode){
      await dispatch(updateCustomer({ id, data: values }));
    } else{
      await dispatch(createCustomer(formattedValues));
    }
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Modal
      title={isEditMode ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}
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
             <Select showSearch={{ optionFilterProp: 'label', onSearch }} options={CUSTOMER_STATUS_OPTIONS} />
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
            {isEditMode ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};