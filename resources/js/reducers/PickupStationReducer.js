import { Types } from '../actions/pickup-stations/Types'
const initialState = {
  stationDetail: {},
  stations: [],
  customerPickupStations: []
}

export default function pickupStationReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_PICKUP_STATION:
      return { ...state, satitons: action.payload }

    case Types.GET_CUSTOMER_PICKUP_LOCATION:
      return { ...state, customerPickupStations: action.payload }

    case Types.NEW_PICKUP_STATION:
      return {
        ...state,
        stations: state.stations.concat(action.payload)
      }

    case Types.ALL_PICKUP_STATIONS:
      return {
        ...state, stations: action.payload
      }
    case Types.UPDATE_PICKUP_STATION:
      return {
        ...state,
        stations: state.stations.map((station) => {
          return station.id === action.payload.id ? action.payload : station
        })
      }
    case Types.DELETE_PICKUP_STATION:
      return { ...state, stations: state.stations.filter((station) => station.id !== action.payload.id) }

    default:
      return state
  }
}
