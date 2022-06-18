import React from 'react'
import { Space, Table, Tag } from 'antd';

export default function CreditAssetTable() {
    const columns = [
        {
          title: "Asset",
          dataIndex: 'asset',
          key: 'asset',
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Credit",
          dataIndex: 'credit',
          key: 'credit',
        },
        {
          title: '',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>MINT</a>
            </Space>
          ),
        },
      ];
      const data = [
        {
          key: '1',
          asset: 'ETH',
          credit: 0.31,
        },
        {
            key: '2',
            asset: 'ETH',
            credit: 6.43,
        },
        {
            key: '3',
            asset: 'ETH',
            credit: 0.234,
        },
        {
            key: '3',
            asset: 'ETH',
            credit: 0.234,
        },

        {
            key: '3',
            asset: 'ETH',
            credit: 0.234,
        },

        {
            key: '3',
            asset: 'ETH',
            credit: 0.234,
        },

        {
            key: '3',
            asset: 'ETH',
            credit: 0.234,
        },
      ];
  return (
    <div>
        <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  )
}
