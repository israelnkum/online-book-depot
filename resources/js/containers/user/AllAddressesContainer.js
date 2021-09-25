import { connect } from 'react-redux'
import { getAllAddress } from '../../actions/user/UserAction'
import { AllAddresses } from '../../components/customer/account-overview/address-book/all-addresses'
const mapStateToProps = (state) => ({
  addressBook: state.userReducer.addressBook
})

const mapDispatchToProps = (dispatch) => ({
  getAllAddress: () => getAllAddress(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AllAddresses)
