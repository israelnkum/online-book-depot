import React, {useState} from 'react';
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import {Layout, Menu, Spin} from 'antd';
import Navigation from "../landing/navigation";
import SideNav from "./side-nav";
import {PoweroffOutlined} from "@ant-design/icons";
import {logout} from "../../actions/logout/LogoutAction";
import {useDispatch} from "react-redux";

const { Content, Footer } = Layout;

export default function Main(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        setLoading(true)
        dispatch(logout()).then(() => {
            window.location.reload()
            window.location.replace('/login')
            setLoading(false)
        })

    }
    return (
        <Spin spinning={loading}>
            <Layout>
                <Navigation>
                    <Menu.Item key={'Logout'} onClick={() =>  handleLogout()} icon={<PoweroffOutlined size={'small'}/>}>
                        Logout
                    </Menu.Item>
                </Navigation>
                <Layout style={{ marginTop: 64 }}>
                    <SideNav/>
                    <Layout>
                        <Content style={{ margin: '10px 10px 0' }}>
                            <div className="site-layout-background" style={{ minHeight: 490 }}>
                                {props.children}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>&copy; {new Date().getFullYear()} Online Stationery Shop</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </Spin>

    );
}

Main.propTypes = {
    children: PropTypes.node.isRequired
}
