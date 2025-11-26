import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';
import dayjs from 'dayjs';
import { PortfolioItem } from '@/types/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsPortfolioModalOpen } from '@/store/portfoliosSlice';

interface PortfolioFormProps {
  initialValues?: PortfolioItem | null;
}

export const PortfolioForm: React.FC<PortfolioFormProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  const { isPortfolioModalOpen } = useAppSelector((state) => state.portfolios);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isPortfolioModalOpen) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          date: dayjs(initialValues.date)
        });
      } else {
        form.resetFields();
        form.setFieldValue('date', dayjs());
      }
    }
  }, [open, initialValues, form]);

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      date: values.date.format('YYYY-MM-DD')
    };
    // onSubmit(formattedValues);
  };

  return (
    <Modal
      title={initialValues ? "Portföyü Düzenle" : "Yeni Portföy Ekle"}
      open={isPortfolioModalOpen}
      onCancel={() => dispatch(setIsPortfolioModalOpen(false))}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="İlan Başlığı" rules={[{ required: true }]}>
          <Input placeholder="Örn: Deniz Manzaralı 3+1" />
        </Form.Item>

        <Form.Item name="imageUrl" label="Resim URL" rules={[{ required: true }]}>
          <Input placeholder="https://..." />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="price" label="Fiyat" style={{ flex: 1 }} rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
          </Form.Item>
          <Form.Item name="currency" label="Birim" style={{ width: 100 }} initialValue="TL">
            <Select options={[{ label: 'TL', value: 'TL' }, { label: 'USD', value: 'USD' }]} />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="status" label="Durum" style={{ flex: 1 }} initialValue="Satılık">
            <Select options={[{ label: 'Satılık', value: 'Satılık' }, { label: 'Kiralık', value: 'Kiralık' }]} />
          </Form.Item>
        </div>

        <Form.Item name="description" label="Açıklama">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="matchedClient" label="Müşteri İle Eşleştir">
          <Select
            placeholder="Potansiyel alıcı seçin"
            allowClear
            maxCount={2}
            options={[]}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <Button onClick={() => dispatch(setIsPortfolioModalOpen(false))}>İptal</Button>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};