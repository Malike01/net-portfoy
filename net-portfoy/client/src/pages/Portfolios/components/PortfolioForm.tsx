import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Upload, UploadProps, message, Radio, Divider } from 'antd';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setIsPortfolioModalOpen } from '@/store/portfoliosSlice';
import { CURRENCY_OPTIONS, PORTFOLIO_STATUS_OPTIONS, PORTFOLIO_TYPE_OPTIONS, PORTFOLIO_TYPES } from '@/constant/Portfolio';
import { GlobalOutlined, HomeOutlined, LinkOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { IMAGE_UPLOAD_FILE_TYPES, REGEX } from '@/constant/General';
import { truncateText } from '@/utils';
import { setIsCustomerModalOpen } from '@/store/customersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { createPortfolio, fetchPortfolioById, updatePortfolio } from '@/services/portfolioService';
import styles from '../Portfolios.module.css';

export const PortfolioForm: React.FC = () => {
  const [form] = Form.useForm();

  const { id } = useParams();
  const isEditMode = !!id;

  const navigate = useNavigate();

  const { isPortfolioModalOpen, currentItem } = useAppSelector((state) => state.portfolios);
  const { customers } = useAppSelector((state) => state.customers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchPortfolioById(id!));
    } else {
      dispatch(clearCurrentItem());
      form.resetFields();
      form.setFieldsValue({
        portfolioType: PORTFOLIO_TYPES.FOR_SALE,
        status: 'active',
        currency: 'TL',
        externalLinks: { sahibinden: '', hepsiemlak: '', emlakjet: '' },
        imageUrl: '',
        date: dayjs().toDate(),
      });
    }
  }, [dispatch, id, isEditMode, form]);


  const handleFinish = async (values: any) => {
    const params = {
      ...values,
      externalLinks: {
        sahibinden: values.sahibinden,
        hepsiemlak: values.hepsiemlak,
        emlakjet: values.emlakjet
      }
    }
    try {
      if (isEditMode) {
        await dispatch(updatePortfolio({
          id: id!, data: params
        })).unwrap();
        message.success('Portföy başarıyla güncellendi.');
      } else {
        await dispatch(createPortfolio(params)).unwrap();
        message.success('Portföy başarıyla oluşturuldu.');
      }
      navigate('/portfolios');
      dispatch(setIsPortfolioModalOpen(false));
    } catch (error) {
      console.error('İşlem başarısız', error);
      message.error('İşlem sırasında bir hata oluştu.');
    }
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  useEffect(() => {
    if (currentItem && isEditMode) {
      form.setFieldsValue({
        ...currentItem,
        sahibinden: currentItem.externalLinks?.sahibinden || '',
        hepsiemlak: currentItem.externalLinks?.hepsiemlak || '',
        emlakjet: currentItem.externalLinks?.emlakjet || '',
        matchedCustomers: customers.find(c => currentItem.matchedCustomers?.includes(c._id)) ? currentItem.matchedCustomers : []
      });
    }
  }, [currentItem, isEditMode, form]);

  const props: UploadProps = {
    name: 'file',
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const isFormat = IMAGE_UPLOAD_FILE_TYPES.includes(file.type);
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

  const handleCancel = () => {
    dispatch(clearCurrentItem());
    dispatch(setIsPortfolioModalOpen(false));
    navigate('/portfolios');
    form.resetFields();
  };


  return (
    <Modal
      title={isEditMode ? "Portföyü Düzenle" : "Yeni Portföy Ekle"}
      open={isPortfolioModalOpen}
      centered
      onCancel={handleCancel}
      footer={null}
      destroyOnHidden={true}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="İlan Başlığı" rules={[{ required: true, min: 5, message: 'Başlık en az 5 karakter olmalıdır' }]}>
          <Input placeholder="Örn: Deniz Manzaralı 3+1" maxLength={25} />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item name="price" label="Fiyat" className={styles.flexItem} rules={[{ required: true }]}>
            <InputNumber defaultValue={0} className={styles.fullWidth} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
          </Form.Item>
          <Form.Item name="currency" label="Birim" className={styles.currencySelect} initialValue="TL">
            <Select options={CURRENCY_OPTIONS} />
          </Form.Item>
        </div>
        <Form.Item name="status" label="Durum" className={styles.flexItem} initialValue="Satılık">
          <Select options={PORTFOLIO_STATUS_OPTIONS} />
        </Form.Item>
        <Form.Item name="description" label="Açıklama">
          <Input.TextArea rows={3} maxLength={50} placeholder='İlan hakkında kısa bir açıklama...' />
        </Form.Item>
        <div className={styles.typeRow}>
          <Form.Item name="portfolioType" label="Portföy Tipi" rules={[{ required: true }]}>
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
        <Form.Item
          label=""
          name="sahibinden"
          rules={[
            { type: 'url', message: 'Lütfen geçerli bir URL girin!' },
            { pattern: REGEX.SAHIBINDEN, message: 'Sadece sahibinden.com linki kabul edilir.' }
          ]}
        >
          <Input
            size="large"
            placeholder="https://www.sahibinden.com/ilan/..."
            prefix={<LinkOutlined className={styles.sahibindenIcon} />}
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
            prefix={<HomeOutlined className={styles.hepsiemlakIcon} />}
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
            prefix={<GlobalOutlined className={styles.emlakjetIcon} />}
            allowClear
          />
        </Form.Item>
        <Form.Item name="matchedCustomers" label="Müşteri İle Eşleştir">
          <Select
            placeholder="Müşteri seçin..."
            allowClear
            mode="multiple"
            showSearch={{ optionFilterProp: 'label', onSearch }}
            options={customers.map((customer) => ({
              value: customer._id,
              label: customer.name,
            }))}
            popupRender={(menu) => (
              <>
                {menu}
                <Divider className={styles.divider} />
                <Button type="text" icon={<PlusOutlined />} onClick={() => {
                  dispatch(setIsCustomerModalOpen(true))
                }}>
                  Yeni Müşteri Ekle
                </Button>
              </>
            )}
          />
        </Form.Item>

        <div className={styles.footer}>
          <Button onClick={() => dispatch(setIsPortfolioModalOpen(false))}>İptal</Button>
          <Button type="primary" htmlType="submit">
            {isEditMode ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};