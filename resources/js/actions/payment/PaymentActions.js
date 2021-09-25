import { Types } from './Types'
import api from '../../utils/api'

export function makePayment (payload) {
  return {
    type: Types.MAKE_PAYMENT, payload: payload
  }
}

export function createOrder (payload) {
  return {
    type: Types.CREATE_ORDER, payload: payload
  }
}

export function clearCart () {
  return {
    type: 'CLEAR_CART'
  }
}

export const handleMakePayment = (paymentData, order) => (dispatch) => {
  // eslint-disable-next-line no-undef
  FlutterwaveCheckout({
    public_key: 'FLWPUBK_TEST-a119e50a7d5e581e3a1260605fbe9dd1-X',
    tx_ref: 'oss_' + Math.floor((Math.random() * 100000000) + 1),
    amount: paymentData.amount,
    currency: 'GHS',
    country: 'GH',
    payment_options: ' ',
    // redirect_url: 'http://localhost:3000/home',
    customer: {
      email: paymentData.user.email,
      phone_number: paymentData.user.phoneNumber,
      name: paymentData.user.name
    },
    callback: function (data) {
      return new Promise((resolve, reject) => {
        const dataToPost = {
          data: data,
          order: order,
          deliveryFee: paymentData.deliveryFee,
          itemTotal: paymentData.itemTotal
        }
        api().post('/order/pay', dataToPost).then((res) => {
          dispatch(clearCart())
          resolve(res)
          window.location.reload()
          window.location.replace('/orders')
        }).catch((err) => {
          reject(err)
        })
      })
    },
    onclose: handleUpdateOrderStatus(order.id, 'canceled'),
    customizations: {
      title: 'Online Stationery Shop',
      description: 'Payment for items in cart',
      logo: 'http://localhost:3000/storage/assets/logo.png'
    }
  })
  // return new Promise((resolve, reject) => {
  //   api().post('/order/pay', dataToPost).then((res) => {
  //     resolve(res)
  //     window.location.reload()
  //     window.location.replace('/orders')
  //   }).catch((err) => {
  //     reject(err)
  //   })
  // })
}

export const handleCreateOrder = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/order/create', data).then((res) => {
      dispatch(createOrder(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleUpdateOrderStatus = (orderId, status) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/order/update-order-status/${orderId}/${status}`).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
