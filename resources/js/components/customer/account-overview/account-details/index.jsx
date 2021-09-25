import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Spin, Typography } from 'antd'
import { LockOutlined, UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { EditDetails } from './edit-details'
import { Link } from 'react-router-dom'

export default function Index (props) {
  const [editing, setEditing] = useState(false)
  return (
        <Spin spinning={props.loading}>
            <Card
                title={'Account Details'}
                size={'small'}
                extra={
                    <EditDetails formValues={props.userDetail}/>
                }
                actions={[
                    <Link key={'change-password'} to={'/change-password'}>
                        <Button type={'default'} icon={<LockOutlined key="change-password" />}>
                            Change Password
                        </Button>
                    </Link>
                ]}>
                {
                    props.loading === false &&
                    <>
                        <Typography.Title level={5} editable={editing}>
                            <UserOutlined />  {props.userDetail.name}
                        </Typography.Title>
                        <Typography.Text level={5}>
                            <PhoneOutlined /> {props.userDetail.phoneNumber}
                        </Typography.Text> <br/>
                        <Typography.Text level={5}>
                            <MailOutlined /> {props.userDetail.email}
                        </Typography.Text>
                    </>
                }
            </Card>
        </Spin>
  )
}
Index.propTypes = {
  userDetail: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}
