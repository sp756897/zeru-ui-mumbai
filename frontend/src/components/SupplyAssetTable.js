import React, { useCallback, useEffect } from 'react'
import { Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import SupplyModal from './SupplyModal';
import { useSelector } from 'react-redux';

export default function SupplyAssetTable(props) {

    const reserveData = useSelector((state) => state.reserve.reserveData);
    const userWalletBalancesDictionary = useSelector((state) => state.account.userWalletBalancesDictionary);

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
                <Space size="middle" >
                    <SupplyModal a="primary" />
                    <Button><Link to="/details" state={{ asset: "ETH" }}>details</Link></Button>
                </Space>
            ),
            align: 'center'
        },
    ];

    const supplyAssetTableList = []
    const data = reserveData ? reserveData.map((data, key) => {

        if (data.isActive) {
            let isCollateral = data.usageAsCollateralEnabled ? "Yes" : "No"
            let asset = data.underlyingAsset
            let balanceValue = userWalletBalancesDictionary ? parseInt(userWalletBalancesDictionary[asset]) : 0
            supplyAssetTableList.push(
                {
                    key: key,
                    asset: data.name,
                    balance: balanceValue,
                    apy: data.supplyAPY,
                    collateral: isCollateral,
                }
            )
        }
    }) : ""

    return (
        <div>
            <Table columns={columns} dataSource={supplyAssetTableList} pagination={false} />
        </div>
    )
}
