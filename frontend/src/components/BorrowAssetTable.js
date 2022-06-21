import React from 'react'
import { Button, Space, Table } from 'antd';

export default function BorrowAssetTable(props) {
    const columns = [
        {
            title: props.titles.c1,
            dataIndex: 'asset',
            key: 'asset',
            render: (text) => <a>{text}</a>,
            align:'center'
        },
        {
            title: props.titles.c2,
            dataIndex: 'balance',
            key: 'balance',
            align:'center'
        },
        {
            title: props.titles.c3,
            dataIndex: 'apy',
            key: 'apy',
            align:'center'
        },
        {
            title: props.titles.c4,
            key: 'collateral',
            dataIndex: 'collateral',
            align:'center'
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary'><a>Borrow</a></Button>
                    <Button><a>details</a></Button>
                </Space>
            ),
            align:'center'
        },
    ];
    const data = [
        {
            key: '1',
            asset: 'ETH',
            balance: 0,
            apy: '12%',
            collateral: '12.33%',
        },
        {
            key: '2',
            asset: 'ETH',
            balance: 0,
            apy: '46%',
            collateral: '67.54%',
        },
        {
            key: '3',
            asset: 'ETH',
            balance: 0,
            apy: '23%',
            collateral: '76.4%',
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </div>
    )
}
