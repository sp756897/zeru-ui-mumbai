import { Button, Card, Col, Input, Modal, Row, Switch } from 'antd';
import { useState } from 'react';
import React from 'react';

export default function RepayModal() {
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
            <Button type="primary" onClick={showModal}>
                Repay
            </Button>
            <Modal
                visible={visible}
                title="Repay ETH"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Approve to continue
                    </Button>,
                    <Button
                        key="link"
                        // href="https://google.com"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Repay ETH
                    </Button>,
                ]}
            >
                Amount
                <Row>
                    <Col className='col-left' style={{ width: '400px' }}><Input placeholder='0.00' /></Col>
                    <Col className='col-right'><h3>ETH</h3></Col>
                    MAX : 23.234 ETH
                </Row>


                Transaction Overview
                <Card >
                    <Row className='padding'>
                        <Col className='col-left'>
                            Remaining Debt
                        </Col>
                        <Col className='col-right'>
                            7.98 ETH → 6.34 ETH
                        </Col>
                    </Row>
                    <Row className='padding'>
                        <Col className='col-left'>
                            Health Factor
                        </Col>
                        <Col className='col-right'>
                            47.98→46.34
                        </Col>
                    </Row>

                </Card>
            </Modal>
        </div>
    )
}
