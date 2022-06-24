import { Button, Card, Col, Input, Modal, Row, Switch } from 'antd';
import { useState } from 'react';
import React from 'react';

export default function SupplyModal(props) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);


    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    return (
        <div>
            <Button type={props.a} onClick={showModal}>
                Supply
            </Button>
            <Modal
                visible={visible}
                title="Supply ETH"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Supply ETH
                    </Button>,
                ]}
            >
                Amount
                <Row>
                    <Col className='col-left' style={{width:'400px'}}><Input placeholder='0.00' /></Col>
                    <Col className='col-right'><h3>ETH</h3></Col>
                    MAX : 23.234 ETH
                </Row>


                Transaction Overview
                <Card >
                    <Row className='padding'>
                        <Col className='col-left'>
                            Supply APY
                        </Col>
                        <Col className='col-right'>
                            160.67%
                        </Col>
                    </Row>
                    <Row className='padding'>
                        <Col className='col-left'>
                        Collateralization
                        </Col>
                        <Col className='col-right'>
                        Enabled
                        </Col>
                    </Row>
                    <Row className='padding'>
                        <Col className='col-left'>
                            Health Factor
                        </Col>
                        <Col className='col-right'>
                            44.98→46.34
                        </Col>
                    </Row>

                </Card>
            </Modal>
        </div>
    )
}
