import { Col, Row } from 'antd'
import React from 'react'
import BorrowAssetTable from './BorrowAssetTable'
import BorrowedAssetTable from './BorrowedAssetTable'
import SuppliedAssetTable from './SuppliedAssetTable'
import SupplyAssetTable from './SupplyAssetTable'
import { Progress } from 'antd';



const suppliedtable = { c1: 'Assets', c2: 'Balance', c3: 'APY', c4: 'Collateral' }
const supplytable = { c1: 'Assets', c2: 'Wallet Balance', c3: 'APY', c4: 'Can be collateral' }
const borrowedtable = { c1: 'Assets', c2: 'Debt', c3: 'APY', c4: 'APY type' }
const borrowtable = { c1: 'Assets', c2: 'Available', c3: 'APY,Variable', c4: 'APY,Stable' }

export default function Dashboard() {
    
    return (
        <div className='dashboard' id='dashboard'>
            <Row className='dashboard-details' style={{ height: '10rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                {/* <Col span={4}>
                    Credit Accumulated
                    <p>$30</p>
                </Col>
                <Col span={4}>
                    Supply Balance
                    <p>$30</p>
                </Col> */}
                <Col span={4}>
                    Net Supply Balance
                    <p>$60</p>
                </Col>
                <Col span={4}>
                    Net APY
                    <p>14.65%</p>
                </Col>
                <Col span={4}>
                    Borrow Balance
                    <p>$146</p>
                </Col>
                {/* <Col span={4}>
                    Health Factor
                    <p>1.34</p>
                </Col> */}
            </Row>

            <Row style={{ padding: '0 200px 40px 200px' }}>
                Borrow Limit
                <Progress type='line' percent={10} />
            </Row>
            <Row gutter={[32, 24]} style={{ padding: '0 60px 40px 60px', fontFamily: 'Inter' }}>
                <Col span={12}>
                    <h2>Supplied Assets</h2>
                    <SuppliedAssetTable titles={suppliedtable} />
                </Col>
                <Col span={12} >
                    <h2>Borrowed Asset</h2>
                    <BorrowedAssetTable titles={borrowedtable} />
                </Col>
                <Col span={12} >
                    <h2>Supply Assets</h2>
                    <SupplyAssetTable titles={supplytable} />
                </Col>
                <Col span={12} >
                    <h2>Borrow Assets</h2>
                    <BorrowAssetTable titles={borrowtable} />
                </Col>
            </Row>
        </div>
    )
}
