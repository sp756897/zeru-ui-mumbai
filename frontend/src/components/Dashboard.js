import { Col, Row } from 'antd'
import React from 'react'
import Assettable from './Assettable'

const supplytable = {asset:'Asset',balance:'Balance',apy:'APY',collateral:'Collateral'}
const borrowtable = {asset:'Asset',balance:'Available',apy:'APY,Variable',collateral:'APY,Stable'}

export default function Dashboard() {
    return (
        <div>
            <Row style={{ height: '10rem' }}>
                <Col span={4}>
                    Credit Accumulated
                </Col>
                <Col span={4}>
                    Supply Balance
                </Col>
                <Col span={4}>
                    Net Supply Balance
                </Col>
                <Col span={4}>
                    Net APY
                </Col>
                <Col span={4}>
                    Borrow Balance
                </Col>
                <Col span={4}>
                    Health Factor
                </Col>
            </Row>
            <Row gutter={[8, 16]}>
                <Col span={12}>
                    Supplied Assets
                    <Assettable />
                </Col>
                <Col span={12} >
                    Borrowed Asset
                    <Assettable/>
                </Col>
                <Col span={12} >
                    Supply Assets
                    <Assettable titles={supplytable}/>
                </Col>
                <Col span={12} >
                    Borrow Assets
                    <Assettable titles={borrowtable}/>
                </Col>
            </Row>
        </div>
    )
}
