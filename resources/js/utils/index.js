import { handleUpdateOrderStatus } from '../actions/payment/PaymentActions'
import api from './api'
export const regions = [
  'Ahafo',
  'Ashanti',
  'Bono East',
  'Brong Ahafo',
  'Central',
  'Eastern',
  'Greater Accra',
  'North East',
  'Northern',
  'Savannah',
  'Oti',
  'Upper East',
  'Upper West',
  'Volta',
  'Western',
  'Western North'
]

export const flutterMakePayment = (paymentData, order) => (dispatch) => {
  // eslint-disable-next-line no-undef
  // FlutterwaveCheckout({
  //   public_key: 'FLWPUBK_TEST-a119e50a7d5e581e3a1260605fbe9dd1-X',
  //   tx_ref: 'oss_' + Math.floor((Math.random() * 100000000) + 1),
  //   amount: paymentData.amount,
  //   currency: 'GHS',
  //   country: 'GH',
  //   payment_options: ' ',
  //   // redirect_url: 'http://localhost:3000/home',
  //   customer: {
  //     email: paymentData.user.email,
  //     phone_number: paymentData.user.phoneNumber,
  //     name: paymentData.user.name
  //   },
  //   callback: function (data) {
  //     return new Promise((resolve, reject) => {
  //       const dataToPost = {
  //         data: data,
  //         order: order,
  //         deliveryFee: paymentData.deliveryFee,
  //         itemTotal: paymentData.itemTotal
  //       }
  //       api().post('/order/pay', dataToPost).then((res) => {
  //         resolve(res)
  //         window.location.reload()
  //         window.location.replace('/orders')
  //       }).catch((err) => {
  //         reject(err)
  //       })
  //     })
  //   },
  //   onclose: handleUpdateOrderStatus(order.id, 'canceled'),
  //   customizations: {
  //     title: 'Online Stationery Shop',
  //     description: 'Payment for items in cart',
  //     logo: 'http://localhost:3000/storage/assets/logo.png'
  //   }
  // })
}
