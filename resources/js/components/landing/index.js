import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { enquireScreen } from 'enquire-js'
import Banner from './banner'
import Navigation from './navigation'
import Index from './categories'
import { Divider, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import CategoryItems from '../category-items'
import { Route, Switch } from 'react-router-dom'
import ItemDetail from './item-detail'
import Cart from './cart'
import Dashboard from '../dashboard'
import Shop from './shop'
import Tags from './tags'
import LandingFooter from './landing-footer'
let isMobile
enquireScreen((b) => {
  isMobile = b
})
const { location = {} } = typeof window !== 'undefined' ? window : {}

function Landing () {
  const [isMobile, setIsMobile] = useState()
  const [show, setShow] = useState(!location.port)

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
    if (location.port) {
      setTimeout(() => {
        setShow(true)
      }, 500)
    }
  }, [])

  return (
        <>
            <Navigation >
                <Menu.Item key={'Account'} onClick={() => window.location.href = '/login'} icon={<UserOutlined/>}>
                    Account
                </Menu.Item>
            </Navigation>
            <Switch>
                <Route path={'/'} exact>
                    <Banner/>
                    <Index/>
                    <Divider/>
                    <Tags/>
                    <LandingFooter/>
                </Route>
                <Route path={['/checkout', '/home', '/pickup-stations']} exact component={Dashboard}/>
                <Route path={'/landing/cart'} exact component={Cart}/>
                <Route path={'/landing/shop'} exact component={Shop}/>
                <Route path={'/landing/category/:name/:id/'} exact component={CategoryItems}/>
                <Route path={'/landing/category/:name/:item/detail/:id'} exact component={ItemDetail}/>
            </Switch>
        </>
  )
}
export default Landing
