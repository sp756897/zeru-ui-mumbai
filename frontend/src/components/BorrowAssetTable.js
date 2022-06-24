import React from 'react'
import { Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import BorrowModal from './BorrowModal';
import { useSelector } from 'react-redux';

export default function BorrowAssetTable(props) {

    const reserveData = useSelector((state) => state.reserve.reserveData);
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
    const data = reserveData ? reserveData.map((data, key) => {
        if (data.isActive) {
            let balanceValue = 20
            // console.log("balanceValue: ", balanceValue, "data.name:", data.name, "key: ", key)
            borrowAssetTableList.push(
                {
                    key: key,
                    asset: data.name,
                    balance: balanceValue,
                    apy: data.stableBorrowAPY,
                    collateral: data.variableBorrowAPY,
                }
            )
        }
    }) : ""

    // const data = [
    //     {
    //         key: '1',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '12%',
    //         collateral: '12.33%',
    //     },
    //     {
    //         key: '2',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '46%',
    //         collateral: '67.54%',
    //     },
    //     {
    //         key: '3',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '23%',
    //         collateral: '76.4%',
    //     },
    // ];
    return (
        <div>
            <Table columns={columns} dataSource={borrowAssetTableList} pagination={false} />
        </div>
    )
}
