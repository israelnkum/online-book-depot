import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, useLocation } from 'react-router-dom'
import 'antd/dist/antd.css'
import Main from './main'
import Analytics from './analytics'
import Shop from '../shop'
import TagsAndCategories from '../tag-and-categories'
import Items from '../items'
import Checkout from '../checkout'
import { connect } from 'react-redux'
import Landing from '../landing'
import PickupStation from '../pickup-station'
import { getAuthUser } from '../../actions/user/UserAction'
import { Spin } from 'antd'
import ChangePassword from '../change-password'
import Orders from '../orders'

const Dashboard = (props) => {
  const { handleGetAuthUser, role } = props
  const [loading, setLoading] = useState(true)
  const [hasLanding, setHasLanding] = useState(false)

  useEffect(() => {
    handleGetAuthUser().then(() => {
      setLoading(false)
    })
  }, [])

  const location = useLocation()

  useEffect(() => {
    setHasLanding(window.location.href.indexOf('landing') > -1)
  }, [location])

  return (
        <Spin spinning={loading}>
            {
                hasLanding === true
                  ? <Landing/>
                  : <>
                        <Main>
                            <Switch>
                                <Route path={'/home'} exact component={Analytics}/>
                                <Route path={'/checkout'} exact component={Checkout}/>
                                <Route path={'/change-password'} exact component={ChangePassword}/>
                                <Route path={'/orders'} exact component={Orders}/>
                            </Switch>
                            {
                                role === 'Admin' &&
                                <Switch>
                                    <Route path={'/shops'} exact component={Shop}/>
                                    <Route path={'/orders/all'} exact component={Orders}/>
                                    <Route path={'/tag-categories'} exact component={TagsAndCategories}/>
                                    <Route path={'/items'} exact component={Items}/>
                                    <Route path={'/pickup-stations'} component={PickupStation}/>
                                </Switch>
                            }
                        </Main>
                    </>
            }
        </Spin>
  )
}

Dashboard.propTypes = {
  handleGetAuthUser: PropTypes.func.isRequired,
  role: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    role: state.userReducer.authUser.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAuthUser: () => dispatch(getAuthUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
