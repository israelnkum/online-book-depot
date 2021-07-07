import React from 'react';
import {PlusOutlined} from "@ant-design/icons";
import {ItemForm} from "./item-form";
import AllItemsContainer from "../../containers/items/AllItemsContainer";
import ItemFormContainer from "../../containers/items/ItemFormContainer";
function Items() {

    return (
        <>
            {/*<ItemFormContainer formValues={{ id: '0' }} btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'New Shop'}/>*/}
            {/*<ShopForm formValues={} btnIcon={}/>*/}
           <AllItemsContainer/>
        </>
    );
}
export default Items;
