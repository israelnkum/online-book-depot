import { connect } from 'react-redux'
import AllBrands from "../../components/tag-and-categories/brands/all-brands";
import {getAllBrands} from "../../actions/brands/BrandAction";

const mapStateToProps = (state) => ({
    brands: state.brandReducer.brands,
})

const mapDispatchToProps = (dispatch) => ({
    getAllBrands: () => getAllBrands(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBrands)
