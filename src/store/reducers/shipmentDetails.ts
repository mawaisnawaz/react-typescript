import * as actionTypes from "../actions/actionTypes";

const initialState = {
  shipment: {},
};
const shipmentInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHIPMENT_DETAILS:
      return { ...state, shipment: action.shipment };
    default:
  }

  return state;
};
export default shipmentInformationReducer;
