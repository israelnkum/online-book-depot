import React from 'react'
import { Layout, Col, Row, Typography } from 'antd'
const { Footer } = Layout

const LandingFooter = () => {
  return (
        <Footer style={{ zIndex: 1, width: '100%' }} >
            <Row justify={'center'}>
                <Col span={4}>
                    <div align={'center'} style={{ marginTop: 40, marginBottom: 40 }}>
                        <Typography.Text onClick={() => { window.location.href = '/' }} style={{ cursor: 'pointer' }}>
                            <span className={'logo-brand-1'}>os</span><span className={'logo-brand'}>Shop</span>
                        </Typography.Text> <br/> <br/>
                        <Typography.Text>&copy; {new Date().getFullYear()} Online Stationery Shop</Typography.Text>
                    </div>
                </Col>
            </Row>
        </Footer>
  )
}

export default LandingFooter
