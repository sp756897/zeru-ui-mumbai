import { Card, Col, Row } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import React from 'react'

export default function Staking() {
  return (
    <div>
        <Row>
            <Col span={12}>
                Funds in safety mode<br/>2,345,478.00
            </Col>
            <Col span={12}>
                Total emmission per day<br/>453.67
            </Col>
        </Row>
        <Card>
            Stake ZERU
            <Row>
                <Col span={6}>
                    ZERU
                </Col>
                <Col span={6}>
                    Staking APY<br/>8.20%
                </Col>
                <Col span={6}>
                    Max Slashing<br/>30.00%
                </Col>
                <Col span={6}>
                    <Button>
                        Stake
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    Staked ZERU<br/>10
                </Col>
                <Col span={12}>
                    Claimable ZERU<br/>2
                </Col>
            </Row>
        </Card>
    </div>
  )
}
