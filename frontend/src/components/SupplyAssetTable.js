import React from 'react'
import { Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';

export default function SupplyAssetTable(props) {
  const columns = [
    {
        title: props.titles.c1,
        dataIndex: 'asset',
        key: 'asset',
        render: (text) => <Link to="/details" state={{asset:text}}>{text}</Link>,
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
            <Space size="middle" >
                <Button type='primary'><a>Supply</a></Button>
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
        collateral: 'yes',
    },
    {
        key: '2',
        asset: 'ETH',
        balance: 0,
        apy: '46%',
        collateral: 'yes',
    },
    {
        key: '3',
        asset: 'ETH',
        balance: 0,
        apy: '23%',
        collateral: 'yes',
    },
];
return (
    <div>
        <Table columns={columns} dataSource={data} pagination={false}/>
    </div>
)
}
