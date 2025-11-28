import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Upload, UploadProps, message, Radio } from 'antd';
import dayjs from 'dayjs';
import { PortfolioItem } from '@/types/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsPortfolioModalOpen } from '@/store/portfoliosSlice';
import { CURRENCY_OPTIONS, PORTFOLIO_STATUS_OPTIONS, PORTFOLIO_TYPE_OPTIONS } from '@/constant/Portfolio';
import { GlobalOutlined, HomeOutlined, LinkOutlined, UploadOutlined } from '@ant-design/icons';
import { imageUploadFileTypes } from '@/constant';
import { truncateText } from '@/utils';

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

  const onSearch = (value: string) => {
   console.log('search:', value);
 };

 const props: UploadProps = {
  name: 'file',
  // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload: (file) => {
    const isFormat = imageUploadFileTypes.includes(file.type);
    if (!isFormat) {
      message.error(`${file.name} format türü uygun değil.`);
    }
    return isFormat || Upload.LIST_IGNORE;
  },
  onChange(info) {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.name) {
        file.name = truncateText(file.name, 12);
      }
      return file;
    });
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} dosya yüklendi.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} dosya yükleme hatası.`);
    }
  },
};


  return (
    <Modal
      title={initialValues ? "Portföyü Düzenle" : "Yeni Portföy Ekle"}
      open={isPortfolioModalOpen}
      centered
      onCancel={() => {
        dispatch(setIsPortfolioModalOpen(false))
        form.resetFields();
      }}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="İlan Başlığı" rules={[{ required: true, min:5, message: 'Başlık en az 5 karakter olmalıdır' }]}>
          <Input placeholder="Örn: Deniz Manzaralı 3+1" maxLength={25}/>
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="price" label="Fiyat" style={{ flex: 1 }} rules={[{ required: true }]}>
            <InputNumber defaultValue={0} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
          </Form.Item>
          <Form.Item name="currency" label="Birim" style={{ width: 100 }} initialValue="TL">
            <Select options={CURRENCY_OPTIONS} />
          </Form.Item>
        </div>
        <Form.Item name="status" label="Durum" style={{ flex: 1 }} initialValue="Satılık">
          <Select options={PORTFOLIO_STATUS_OPTIONS} />
        </Form.Item>
        <Form.Item name="description" label="Açıklama">
            <Input.TextArea rows={3} maxLength={50} placeholder='İlan hakkında kısa bir açıklama...' />
        </Form.Item>
        <div style={{ display: 'flex', gap: 52 }}>
          <Form.Item name="customerType" label="Müşteri Tipi" rules={[{ required: true }]}>
              <Radio.Group
                block
                options={PORTFOLIO_TYPE_OPTIONS}
                defaultValue="for_sale"
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          <Form.Item name="imageUrl" label="Resim (Max: 1)">
            <Upload {...props} maxCount={1}>
              <Button icon={<UploadOutlined />}>Resim Ekle</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item name="link" label="Bağlantı (URL)">
          <Form.Item
            label=""
            name="sahibinden"
            rules={[
              { type: 'url', message: 'Lütfen geçerli bir URL girin!' },
              { pattern: /sahibinden\.com/, message: 'Sadece sahibinden.com linki kabul edilir.' }
            ]}
          >
            <Input 
              size="large" 
              placeholder="https://www.sahibinden.com/ilan/..." 
              prefix={<LinkOutlined style={{ color: '#F9C623' }} />} 
              allowClear
            />
          </Form.Item>

          <Form.Item
            label=""
            name="hepsiemlak"
            rules={[{ type: 'url', message: 'Lütfen geçerli bir URL girin!' }]}
          >
            <Input 
              size="large" 
              placeholder="https://www.hepsiemlak.com/..." 
              prefix={<HomeOutlined style={{ color: '#d9232e' }} />} // Hepsiemlak kırmızısı
              allowClear
            />
          </Form.Item>

          <Form.Item
            label=""
            name="emlakjet"
            rules={[{ type: 'url', message: 'Lütfen geçerli bir URL girin!' }]}
          >
            <Input 
              size="large" 
              placeholder="https://www.emlakjet.com/..." 
              prefix={<GlobalOutlined style={{ color: '#2ecc71' }} />} // Yeşil ton
              allowClear
            />
          </Form.Item>
        </Form.Item>

        <Form.Item name="matchedClient" label="Müşteri İle Eşleştir">
          <Select
            placeholder="Müşteri seçin..."
            allowClear
            mode="multiple"
            showSearch={{ optionFilterProp: 'label', onSearch }}
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