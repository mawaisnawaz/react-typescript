import * as actionTypes from "./actionTypes";

const setShipmentDetails = (shipmentData) => ({
  type: actionTypes.SET_SHIPMENT_DETAILS,
  shipment: shipmentData,
});

export const fetchShipmentDetails = (shipmentId: string) => {
  return (dispatch, getState) => {
    const tableData = getState().list.tableData;
    const shipmentDetails = tableData.find(
      (data: { id: string }) => data.id === shipmentId
    );

    dispatch(setShipmentDetails(shipmentDetails));
  };
};

export const updateShipmentInfo = (updatedName: string) => {
  return (dispatch, getState) => {
    const shipmentInfo = getState().details.shipment;
    const updatedShipmentInfo = { ...shipmentInfo, ...{ name: updatedName } };

    dispatch(setShipmentDetails(updatedShipmentInfo));
  };
};
