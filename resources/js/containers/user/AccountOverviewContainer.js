import { connect } from 'react-redux'
import {getUserDetail} from "../../actions/user/UserAction";
import AccountOverview from "../../components/customer/account-overview";

const mapStateToProps = (state) => ({
    userDetail: state.userReducer.userDetail,
})

const mapDispatchToProps = (dispatch) => ({
    getAllUsers: () => getUserDetail(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverview)
