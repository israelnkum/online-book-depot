import React from 'react';
import AllShopsContainer from "../../containers/shop/AllShopsContainer";
import {PlusOutlined} from "@ant-design/icons";
import {ShopForm} from "./shop-form";
import {TagForm} from "./tag-form";
function Tags() {

    return (
        <>
            <TagForm formValues={{ id: '0' }} btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'New Shop'}/>
            {/*<ShopForm formValues={} btnIcon={}/>*/}
           <AllShopsContainer/>
        </>
    );
}
export default Tags;
