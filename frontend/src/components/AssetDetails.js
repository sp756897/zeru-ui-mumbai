import { Row, Col, Card } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/AssetDetails.css'

export default function AssetDetails() {
  const location = useLocation()
  const { asset } = location.state

  return (
    <div className='assetdetails'>
      You clicked {asset}
      <Row className='overallview' style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <Col span={4}>
          {asset}<br/>
          Wrapped ETH
        </Col>
        <Col span={4}>
          Reserve Size<br/>
          $ 33.00M
        </Col>
        <Col span={4}>
          Available Liquidity<br/>
          $ 1,454.00
        </Col>
        <Col span={4}>
          Oracle price<br/>
          $ 1,345.9
        </Col>
      </Row>
      <Row>
        <Card style={{width:'900px',marginLeft:'auto',marginRight:'auto',marginBottom:'50px'}}>
          <Row className='supplyrow'>
            <Row style={{display:'flex',alignItems:'center',justifyContent:'space-around',gap:'5rem'}}>
              <Col>
                <h3 >Supply Info</h3>
              </Col>
              <Col >
                <h3>Total Supplied</h3>
                $ 30.12M
              </Col>
              <Col >
                <h3>apy</h3>
                267.76%
              </Col>
            </Row>
            <Row className='collateralusage'>
              <h3>Collateral usage</h3>can be collateral? yes
              <Col style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',flexDirection:'row',gap:'2rem'}}>
                <Card>
                  <h3>MAX LTV</h3>
                  80.00%
                </Card>
                <Card>
                  <h3>liquidation threshold</h3>
                  82.00%
                </Card>
                <Card>
                  <h3>Liquidation penalty</h3>
                  5.00%
                </Card>
              </Col>
            </Row>
          </Row>
          <Row className='borrowinfo'>
            <h3>Borrow Info</h3>
            <Col>
            <h3>Total Borrowed</h3>
            30,456.98
            </Col>
            <Col>
            <h3>APY variable</h3>
            230.98%
            </Col>
            <Col>
            <h3>APY stable</h3>
            250.45%
            </Col>
          </Row>
        </Card>
      </Row>

    </div>
  )
}
