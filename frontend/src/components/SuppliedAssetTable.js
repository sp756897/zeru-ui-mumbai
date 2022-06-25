import React from 'react'
import { Button, Space, Table } from 'antd';
import { Switch } from 'antd';
import { Link } from 'react-router-dom';
import WithdrawModal from './WithdrawModal';
import SupplyModal from './SupplyModal';
import { useSelector } from 'react-redux';

export default function SuppliedAssetTable(props) {

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
            align: 'center',
            render: (text, record) => (
                <Switch checked={record.collateral}/>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <WithdrawModal rowData={record}/>
                    <SupplyModal a={record}/>
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
    //         collateral: 'yes',
    //     },
    //     {
    //         key: '2',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '46%',
    //         collateral: 'yes',
    //     },
    //     {
    //         key: '3',
    //         asset: 'ETH',
    //         balance: 0,
    //         apy: '23%',
    //         collateral: 'yes',
    //     },
    // ];

    const supplyAssetTableList = []
    const data = userSummary ? userSummary.userReservesData.map((data, key) => {
        if (true) {
            // let isUsedAsCollateral = data.usageAsCollateralEnabledOnUser
            let isUsedAsCollateral = data.reserve.usageAsCollateralEnabled
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
        console.log("starts here")
        console.log(data.reserve.usageAsCollateralEnabled)
    }) : ""

    return (
        <div>
            <Table columns={columns} dataSource={supplyAssetTableList} pagination={false} />
        </div>
    )
}
