import { Col, Row } from 'antd'
import { Typography } from 'antd';
import React from 'react'
import CreditAssetTable from './CreditAssetTable';


const { Title } = Typography;

export default function Credit() {
  return (
    <div>
        <Row>
            <Col span={12} style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
            Available Credit:<br/>
            <Title level={1}>
                10,000.00
            </Title>
            </Col>

        </Row>
        <Row>
            <Col span={12} style={{marginLeft:'auto',marginRight:'auto'}}>
            Your Credits
            <CreditAssetTable/>
            </Col>
            
        </Row>
    </div>
  )
}
