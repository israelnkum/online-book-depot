import { connect } from 'react-redux'
import AllShop from "../../components/shop/all-shops";
import {getAllShops} from "../../actions/shop/ShopAction";

const mapStateToProps = (state) => ({
    shops: state.shopReducer.shops,
})

const mapDispatchToProps = (dispatch) => ({
    getAllShops: () => getAllShops(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllShop)
