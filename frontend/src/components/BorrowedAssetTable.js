import React from 'react'
import { Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import RepayModal from './RepayModal';
import BorrowModal from './BorrowModal';
import { useSelector } from 'react-redux';

export default function BorrowedAssetTable(props) {

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
                    <RepayModal />
                    <BorrowModal a="default" />
                </Space>
            ),
            align: 'center'
        },
    ];

    // const data = [
    //     {
    //         key: '1',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '12%',
    //         collateral: 'variable',
    //     },
    //     {
    //         key: '2',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '46%',
    //         collateral: 'variable',
    //     },
    //     {
    //         key: '3',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '23%',
    //         collateral: 'variable',
    //     },
    // ];

    const borrowAssetTableList = []
    const data = userSummary ? userSummary.userReservesData.map((data, key) => {
        if (true) {
            let apyType = data.reserve.stableBorrowRateEnabled
            let selectedAPYType = apyType ? data.stableBorrowAPY : data.reserve.variableBorrowAPY
            let apyTypeString = apyType ? "Stable" : "Variable"
            borrowAssetTableList.push(
                {
                    key: key,
                    asset: data.reserve.name,
                    balance: data.totalBorrows,
                    apy: selectedAPYType,
                    collateral: apyTypeString,
                }
            )
            console.log(key, data.reserve.name, selectedAPYType, apyTypeString)

        }
    }) : ""

    return (
        <div>
            <Table columns={columns} dataSource={borrowAssetTableList} pagination={false} />
        </div>
    )
}
