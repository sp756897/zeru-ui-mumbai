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

    // const loadSupplyTable = useCallback(() => {
    //     let a = reserveData ? reserveData.map((data, key) => {
    //         // console.log("userWalletBalancesDictionary: ", userWalletBalancesDictionary[data.underlyingAsset], "data name: ", data.name)
    //         if (data.isActive) {
    //             let isCollateral = data.usageAsCollateralEnabled ? "Yes" : "No"
    //             let balanceValue = userWalletBalancesDictionary ? userWalletBalancesDictionary[data.underlyingAsset] : 1
    //             console.log("balanceValue: ", balanceValue)
    //             console.log("yes")
    //             supplyAssetTableList.push(
    //                 {
    //                     key: key,
    //                     asset: data.name,
    //                     balance: 1,
    //                     apy: data.supplyAPY,
    //                     collateral: isCollateral,
    //                 }
    //             )
    //         }
    //     }) : ""
    // }, [reserveData, userWalletBalancesDictionary])

    // useEffect(() => {
    //     loadSupplyTable()
    // }, [loadSupplyTable])

    const data = reserveData ? reserveData.map((data, key) => {
        if (data.isActive) {
            let isCollateral = data.usageAsCollateralEnabled ? "Yes" : "No"
            let balanceValue = userWalletBalancesDictionary ? parseInt(userWalletBalancesDictionary["0x1C21050a572b230ef50006d8833E822D44Dac552"]) : 20
            // console.log("balanceValue: ", balanceValue, "data.name:", data.name, "key: ", key)
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

    // useEffect(() => {
    //     console.log("userWalletBalancesDictionary: ", userWalletBalancesDictionary)
    //     const data = reserveData ? reserveData.map((data, key) => {
    //         if (data.isActive) {
    //             let isCollateral = data.usageAsCollateralEnabled ? "Yes" : "No"
    //             // console.log(ethers.utils.formatEther(parseInt(liquidity_minted.data)))

    //             let balanceValue = userWalletBalancesDictionary ? parseInt(userWalletBalancesDictionary[data.underlyingAsset]) : 20
    //             console.log("balanceValue: ", balanceValue, "data.name:", data.name, "key: ", key)
    //             supplyAssetTableList.push(
    //                 {
    //                     key: key,
    //                     asset: data.name,
    //                     balance: balanceValue,
    //                     apy: data.supplyAPY,
    //                     collateral: isCollateral,
    //                 }
    //             )
    //         }
    //     }) : 
    // [
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
    //     console.log(supplyAssetTableList)
    // }, [userWalletBalancesDictionary])

    return (
        <div>
            <Table columns={columns} dataSource={supplyAssetTableList} pagination={false} />
        </div>
    )
}
