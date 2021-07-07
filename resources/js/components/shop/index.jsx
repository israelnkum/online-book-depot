import React from 'react';
import AllShopsContainer from "../../containers/shop/AllShopsContainer";
import {PlusOutlined} from "@ant-design/icons";
import {ShopForm} from "./shop-form";
function Shop() {

    return (
        <>
            <ShopForm formValues={{ id: '0' }} btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'New Shop'}/>
            {/*<ShopForm formValues={} btnIcon={}/>*/}
           <AllShopsContainer/>
        </>
    );
}
export default Shop;
