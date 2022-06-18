import { Card, Col, Row } from 'antd'
import { Button } from 'antd';
import { Typography } from 'antd';

import React from 'react'
import "../styles/styles.css"

const flexcss = { display: 'flex', alignItems: 'center', justifyContent: 'space-around', textAlign: 'center' }

const { Title } = Typography;
export default function Staking() {
    return (
        <div>
            <Row className='textaligncenter'>
                <Col span={12} className='text'>
                    Funds in safety mode
                    <p className='value'>2,345,478.00</p>
                </Col>
                <Col span={12} className='text'>
                    Total emmission per day
                    <p className='value'>453.67</p>
                </Col>
            </Row>
            <Card style={{ maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Title level={2}>Stake ZERU</Title>
                <br />
                <Row style={flexcss}>
                    <Col span={6}>
                        <Title level={5}>ZERU</Title>
                    </Col>
                    <Col span={6}>
                        Staking APY
                        <Title level={5}>8.20%</Title>

                    </Col>
                    <Col span={6}>
                        Max Slashing
                        <Title level={5}>30.00%</Title>

                    </Col>
                    <Col span={6}>
                        <Button type="primary">
                            Stake
                        </Button>
                    </Col>
                </Row>
                <Row style={flexcss}>
                    <Col span={12}>
                        <Card style={{ height:'200px' }}>
                            <h2 level={3}>Staked ZERU</h2>
                            <Title level={2}>10</Title>
                            
                        </Card>

                    </Col>
                    <Col span={12} >
                    <Card style={{ height:'200px' }}>
                            <h2>Claimable ZERU</h2>
                            <Title level={2}>2</Title>
                            <Button type='primary'>
                                Claim ZERU
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
