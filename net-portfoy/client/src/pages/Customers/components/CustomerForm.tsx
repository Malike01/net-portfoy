import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, Radio, message } from 'antd';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from '@/constant/Customers';
import { DATE_FORMAT, REGEX } from '@/constant/General';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import dayjs from 'dayjs';
import { createCustomer, updateCustomer } from '@/services/customerService';
import { useParams } from 'react-router-dom';
import styles from './CustomerForm.module.css';


export const CustomerForm: React.FC = () => {
  const [form] = Form.useForm();

  const { isCustomerModalOpen, customers } = useAppSelector((state) => state.customers);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = [{ title: 'Portföy 1', id: 1 }].filter((o) => !selectedItems.includes(o.id.toString()));

  const status = Form.useWatch('status', form);

  const dispatch = useAppDispatch();

  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isCustomerModalOpen) {
      if (isEditMode) {
        const formValues = customers.find(c => c._id === id);
        form.setFieldsValue({ 
          ...formValues, 
          portfolioId: formValues?.portfolioTitle, 
          nextActionDate: dayjs(formValues?.nextActionDate).format(DATE_FORMAT) 
        });
      } else {
        form.resetFields();
      }
    }
  }, [isCustomerModalOpen, isEditMode, form, customers, id]);

  const handleFinish = async (values: any) => {
    const selectedPortfolio = [{ id: 1, title: 'Portföy 1' }].find(p => values.portfolioId?.includes(p.id));
    const formattedValues = {
      ...values,
      portfolioTitle: selectedPortfolio ? selectedPortfolio.title : undefined,
      portfolioId: selectedPortfolio ? [selectedPortfolio.id.toString()] : undefined,
    };

    try {
      if (isEditMode) {
        await dispatch(updateCustomer({ id, data: values })).unwrap();
        message.success('Müşteri başarıyla güncellendi.');
      } else {
        await dispatch(createCustomer(formattedValues)).unwrap();
        message.success('Müşteri başarıyla oluşturuldu.');
      }
      dispatch(setIsCustomerModalOpen(false));
      form.resetFields();
    } catch (error) {
      console.error('İşlem başarısız', error);
      message.error('İşlem sırasında bir hata oluştu.');
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
        <div className={styles.row}>
          <Form.Item name="phone" label="Telefon" className={styles.flexItem} rules={[{ required: true, pattern: REGEX.PHONE }]}>
            <Input placeholder="05XX XXX XX XX" />
          </Form.Item>
          <Form.Item name="status" label="Durum" className={styles.flexItem}>
            <Select showSearch={{ optionFilterProp: 'label', onSearch }} options={CUSTOMER_STATUS_OPTIONS} />
          </Form.Item>
        </div>
        {
         ['to_call', 'appointment'].includes(status) && (
            <Form.Item name="nextActionDate" label="İşlem Tarihi" initialValue={dayjs().format(DATE_FORMAT)}>
              <Input type="date" />
            </Form.Item>
          )
        }

        <Form.Item name="email" label="E-Posta" rules={[{ type: 'email', message: 'Geçersiz e-posta adresi' }]}>
          <Input type="email" placeholder="ornek@mail.com" />
        </Form.Item>
        <Form.Item name="portfolioId" label="İlgilendiği Portföy (Eşleştir)">
          <Select
            allowClear
            value={selectedItems}
            onChange={setSelectedItems}
            mode="multiple"
            showSearch={{ optionFilterProp: 'label', onSearch }}
            placeholder="Bir portföy seçin..."
            options={filteredOptions.map((item) => ({
              value: item.id,
              label: item.title,
            }))}
          />
        </Form.Item>

        <div className={styles.footer}>
          <Button onClick={() => dispatch(setIsCustomerModalOpen(false))}>İptal</Button>
          <Button type="primary" htmlType="submit">
            {isEditMode ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};