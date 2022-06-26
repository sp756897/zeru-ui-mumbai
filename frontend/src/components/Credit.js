import { Col, Row } from 'antd'
import { Typography } from 'antd';
import React from 'react'
import CreditAssetTable from './CreditAssetTable';


const { Title } = Typography;

export default function Credit() {
  return (
    <div className='creditdiv'>
        <Row className='credit-overview'>
            <Col span={12} style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
            Available Credit:<br/>
            <h1 >
                10,000.00
            </h1>
            </Col>

        </Row>
        <Row className='credit-table-row'>
            <Col span={12} style={{marginLeft:'auto',marginRight:'auto'}}>
            <h2 style={{color:'white'}}>Your Credits</h2>
            <CreditAssetTable/>
            </Col>
            
        </Row>
    </div>
  )
}
