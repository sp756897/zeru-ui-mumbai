import React from 'react'
import { Space, Table } from 'antd';
import { Switch } from 'antd';
import { Link } from 'react-router-dom';
import WithdrawModal from './WithdrawModal';
import SupplyModal from './SupplyModal';
import { useSelector } from 'react-redux';

export default function SuppliedAssetTable(props) {

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
                    <WithdrawModal />
                    <SupplyModal a="default" />
                </Space>
            ),
            align: 'center'
        },
    ];

    const supplyAssetTableList = []
    const data = userSummary ? userSummary.userReservesData.map((data, key) => {
        if (true) {
            let isUsedAsCollateral = data.usageAsCollateralEnabledOnUser
            let apyType = data.reserve.stableBorrowRateEnabled
            let selectedAPYType = apyType ? data.stableBorrowAPY : data.reserve.variableBorrowAPY
            let apyTypeString = apyType ? "Stable" : "Variable"
            supplyAssetTableList.push(
                {
                    key: key,
                    asset: data.reserve.name,
                    balance: data.underlyingBalance,
                    apy: data.reserve.supplyAPY,
                    collateral: isUsedAsCollateral,
                }
            )
            console.log(key, data.reserve.name, selectedAPYType, apyTypeString)

        }
    }) : ""

    return (
        <div>
            <Table columns={columns} dataSource={supplyAssetTableList} pagination={false} />
        </div>
    )
}
