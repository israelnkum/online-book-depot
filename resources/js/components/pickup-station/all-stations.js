import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, message, Popconfirm, Space, Table, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import PickupForm from './pickup-form'
import { handleDeletePickupStation, handleGetAllPickupStations } from '../../actions/pickup-stations/Action'
import { connect } from 'react-redux'
import StationDetail from './station-detail'
const { Column } = Table
function AllStations (props) {
  const { stations, getAllStations, deleteStation } = props
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllStations().then(() => {
      setLoading(false)
    })
  }, [])

  const handleDelete = (id) => {
    deleteStation(id).then(() => {
      message.success('Station Deleted')
    }).catch((error) => {
      message.warning(error.response.data)
    })
  }
  return (
      <Table loading={loading} dataSource={stations} scroll={{ x: 50 }} rowKey={'id'}>
          <Column title="Name" render={(text, record) => (
              <Space>
                  <Typography.Text>{record.name}</Typography.Text>
                  <StationDetail detail={record}/>
              </Space>
          )}/>
          <Column title="Contact Person" dataIndex="contactPerson"/>
          <Column title="Description" render={(text, record) => (
             <Space direction={'vertical'} size={0}>
                 <Typography.Text>{record.phoneNumber}</Typography.Text>
                 <Typography.Text>{record.phoneNumberAlt}</Typography.Text>
             </Space>
          )}/>
          <Column
              title="Action"
              render={(text, record) => (
                  <Space>
                      <PickupForm formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>
                      <Popconfirm title="Sure to delete?" onConfirm={() => { handleDelete(record.id) }} cancelText={'No'} okText={'Yes'}>
                          <Button size={'small'} danger icon={<DeleteOutlined/>}/>
                      </Popconfirm>
                  </Space>
              )}
          />
      </Table>
  )
}

AllStations.propTypes = {
  stations: PropTypes.array,
  getAllStations: PropTypes.func.isRequired,
  deleteStation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    stations: state.pickupStationReducer.stations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStations: () => dispatch(handleGetAllPickupStations()),
    deleteStation: (id) => dispatch(handleDeletePickupStation(id))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStations)
