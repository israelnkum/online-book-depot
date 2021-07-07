import { connect } from 'react-redux'
import AllItems from "../../components/items/all-items";
import {getAllItems, getAllTags} from "../../actions/items/ItemAction";
import {getAllBrands} from "../../actions/brands/BrandAction";
import {getAllShops} from "../../actions/shop/ShopAction";
import {getAllCategories} from "../../actions/categories/CategoryAction";

const mapStateToProps = (state) => ({
    items: state.itemReducer.items,
    tags: state.itemReducer.tags,
    brands: state.brandReducer.brands,
    shops: state.shopReducer.shops,
    categories: state.categoryReducer.categories,
})

const mapDispatchToProps = (dispatch) => ({
    getAllItems: () => getAllItems(dispatch),
    getAllBrands: () => getAllBrands(dispatch),
    getAllShops: () => getAllShops(dispatch),
    getAllCategories: () => getAllCategories(dispatch),
    getAllTags: () => getAllTags(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
