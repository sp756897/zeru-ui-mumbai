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
            <div className='dashboard-overview'>
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
                        <div className="net-apy-wrapper">
                            <div className="net-apy">
                                <svg viewBox="0 0 140 140" width="100%">
                                    <path d="M 70 70 L  70 0 A 70 70 0 0 1 70 0 Z" stroke="transparent" fill="#c900c7"></path>
                                    <path d="M 70 70 L  70 0 A 70 70 0 1 1 69.99956017702848 1.381744718642608e-9 Z" stroke="transparent" fill="#c900c7"></path>
                                </svg>
                            </div>
                            <div className="net-apy-description">
                                <label>Net APY</label>
                                <div className="headline">14.67%</div>
                            </div>
                        </div>
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
            </div>

            <Row className='dashboard-asset-table-container' gutter={[32, 24]} style={{ padding: '0 60px 40px 60px', fontFamily: 'Inter' }}>
                <Col span={12}>
                    <h2>Supplied Assets</h2>
                    <SuppliedAssetTable titles={suppliedtable} />
                </Col>
                <Col span={12} >
                    <h2>Borrowed Asset</h2>
                    <BorrowedAssetTable titles={borrowedtable} />
                </Col>
                <Col span={12} >
                    <h2 style={{ color: 'black' }}>Supply Assets</h2>
                    <SupplyAssetTable titles={supplytable} />
                </Col>
                <Col span={12} >
                    <h2 style={{ color: 'black' }}>Borrow Assets</h2>
                    <BorrowAssetTable titles={borrowtable} />
                </Col>
            </Row>
        </div>
    )
}
