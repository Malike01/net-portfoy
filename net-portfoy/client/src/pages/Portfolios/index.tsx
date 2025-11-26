import React, { useState } from 'react';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Masonry, Modal, theme, Dropdown } from 'antd';
import { PortfolioForm } from './components/PortfolioForm';

const heights = [150, 50, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 70, 50, 80];

type ItemType = {
  key: number;
  column?: number;
  data: number;
};

const Portfolios: React.FC = () => {
  const { token } = theme.useToken();

  const [items, setItems] = useState<ItemType[]>(() =>
    heights.map((height, index) => ({
      key: index,
      column: index % 4,
      data: height,
    })),
  );

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const removeItem = (removeKey: React.Key) => {
    setItems((prevItems) => prevItems.filter(({ key }) => key !== removeKey));
  };

  const addItem = () => {
    setIsAddItemModalOpen(true);
    // setItems((prevItems) => [
    //   ...prevItems,
    //   {
    //     key: prevItems.length ? prevItems[prevItems.length - 1].key + 1 : 0,
    //     data: Math.floor(Math.random() * 100) + 50,
    //   },
    // ]);
  };

  return (
    <Flex vertical gap={16}>
      <Button onClick={addItem} type="primary" style={{ alignSelf: 'flex-end' }}>
        Portfoy Ekle
      </Button>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        itemRender={({ data, key }) => (
          <Card size="small" style={{ height: data }}>
            {Number(key) + 1}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'edit',
                    label: 'Düzenle',
                    icon: <EditOutlined />,
                    onClick: () => {
                      setIsAddItemModalOpen(true);
                    },
                  },
                  {
                    key: 'delete',
                    label: 'Sil',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => removeItem(key),
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button
                style={{
                  position: 'absolute',
                  insetBlockStart: token.paddingSM,
                  insetInlineEnd: token.paddingSM,
                }}
                size="small"
                icon={<MoreOutlined />}
              />
            </Dropdown>
          </Card>
        )}
        onLayoutChange={(sortedItems) => {
          setItems((prevItems) =>
            prevItems.map((item) => {
              const matchItem = sortedItems.find((sortedItem) => sortedItem.key === item.key);
              return matchItem
                ? {
                  ...item,
                  column: matchItem.column,
                }
                : item;
            }),
          );
        }}
      />
      {isAddItemModalOpen && (
        <PortfolioForm
          open={isAddItemModalOpen}
          onCancel={() => setIsAddItemModalOpen(false)}
        />
      )
      }
    </Flex>
  );
};

export default Portfolios;