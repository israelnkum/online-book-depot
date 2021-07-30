import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css'
import { enquireScreen } from 'enquire-js';
import Banner from "./banner";
import Navigation from "./navigation";
import Index from "./categories";
import {Divider, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import CategoryItems from '../category-items'
import {Route, Switch} from "react-router-dom";
import ItemDetail from "./item-detail";
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
const { location = {} } = typeof window !== 'undefined' ? window : {};

function Landing() {
    const [isMobile, setIsMobile] = useState()
    const [show, setShow] = useState(!location.port)

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(!!b);
        });
        if (location.port) {
            setTimeout(() => {
                setShow(true)
            }, 500);
        }
    }, [])

    return (
        <>
            <Navigation>
                <Menu.Item key={'Account'} onClick={() =>  window.location.href="/login"} icon={<UserOutlined/>}>
                    Account
                </Menu.Item>
            </Navigation>
            <Switch>
                <Route path={'/'} exact>
                    <Banner/>
                    <Divider/>
                    <Index/>
                </Route>
                <Route path={'/landing/category/:name/:id/'} exact>
                    <CategoryItems/>
                </Route>
                <Route path={'/landing/category/:name/:item/detail/:id'} exact>
                    <ItemDetail/>
                </Route>
            </Switch>
        </>
    );
}
export default Landing;
