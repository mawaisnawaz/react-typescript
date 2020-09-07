import axios from "axios";
import * as actionTypes from "./actionTypes";

const apiUrl = "http://localhost:3001/shipments";

export const fetchShipmentData = () => {
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((res) => {
        dispatch(fetchDataSuccess(res.data));
      })
      .catch((err) => {
        console.error(err as Error);
        dispatch(fetchDataError);
      });
  };
};

const fetchDataSuccess = (tableData: {
  type: string;
  tableData: [];
}): object => ({
  type: actionTypes.FETCH_DATA_SUCCESS,
  tableData,
});

const fetchDataError = (error) => ({
  type: actionTypes.FETCH_DATA_ERROR,
  tableData: [],
});

export const updateShipmentChartInfo = (id, name) => {
  return (dispatch, getState) => {
    const shipmentData = getState().list.tableData;
    const updatedShipmentData = shipmentData.map((sd) => {
      if (sd.id === id) {
        return { ...sd, ...{ name } };
      }
      return sd;
    });

    dispatch(fetchDataSuccess(updatedShipmentData));
  };
};
