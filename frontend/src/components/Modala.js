import { Button, Modal } from 'antd';
import React, { Component } from 'react'

export default class Modala extends Component {
    constructor(){
        super();
        this.state = {
            visibility:false
        }
    }
  render() {
    return (
        <>
        <Button type="primary" onClick={() => this.setState({visibility:true})}>
            Withdraw
        </Button>
        <Modal
            title="withDraw"
            centered
            visible={this.state.visibility}
            onOk={() => this.setState({visibility:false})}
            onCancel={() => this.setState({visibility:false}) }
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    </>
    )
  }
}
