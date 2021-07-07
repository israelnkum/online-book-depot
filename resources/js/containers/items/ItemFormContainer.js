import { connect } from 'react-redux'
import AllItems from "../../components/items/all-items";
import {getAllItems} from "../../actions/items/ItemAction";
import {getAllBrands} from "../../actions/brands/BrandAction";
import {ItemForm} from "../../components/items/item-form";

const mapStateToProps = (state) => ({
    brands: state.brandReducer.brands
})

const mapDispatchToProps = (dispatch) => ({
    getAllBrands: () => getAllBrands(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm)
