import { connect } from 'react-redux'
import AllCategories from "../../components/tag-and-categories/categories/all-categories";
import {getAllCategories} from "../../actions/categories/CategoryAction";

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
})

const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => getAllCategories(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
