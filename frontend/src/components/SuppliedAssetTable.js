import React from 'react'
import { Button, Space, Table } from 'antd';
import { Switch } from 'antd';
import { Link } from 'react-router-dom';
import WithdrawModal from './WithdrawModal';

export default function SuppliedAssetTable(props) {
    const columns = [
        {
            title: props.titles.c1,
            dataIndex: 'asset',
            key: 'asset',
            render: (text) => <Link to="/details" state={{ asset: text }}>{text}</Link>,
            align: 'center'
        },
        {
            title: props.titles.c2,
            dataIndex: 'balance',
            key: 'balance',
            align: 'center'
        },
        {
            title: props.titles.c3,
            dataIndex: 'apy',
            key: 'apy',
            align: 'center'
        },
        {
            title: props.titles.c4,
            key: 'collateral',
            dataIndex: 'collateral',
            align: 'center',
            render: (_, record) => (
                <Switch defaultChecked />
            ),
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <WithdrawModal/>
                    <Button><a>Supply</a></Button>
                </Space>
            ),
            align: 'center'
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
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}
