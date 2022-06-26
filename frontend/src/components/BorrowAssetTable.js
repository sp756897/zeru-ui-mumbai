import React from 'react'
import { Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import BorrowModal from './BorrowModal';
import { useSelector } from 'react-redux';

export default function BorrowAssetTable(props) {

    const userSummary = useSelector((state) => state.account.userSummary);

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
            align: 'center'
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <BorrowModal a="primary" />
                    <Button><Link to="/details" state={{ asset: "ETH" }}>details</Link></Button>
                </Space>
            ),
            align: 'center'
        },
    ];

    const borrowAssetTableList = []
    const data = userSummary ? userSummary.userReservesData.map((data, key) => {
        if (data.reserve.isActive) {
            borrowAssetTableList.push(
                {
                    key: key,
                    asset: data.reserve.name,
                    balance: userSummary.availableBorrowsUSD,
                    apy: data.reserve.stableBorrowAPY,
                    collateral: data.reserve.variableBorrowAPY,
                }
            )
        }
    }) : ""

    return (
        <div>
            <Table columns={columns} dataSource={borrowAssetTableList} pagination={false} />
        </div>
    )
}
