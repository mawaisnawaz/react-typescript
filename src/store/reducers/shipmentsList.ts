import * as actionTypes from "../actions/actionTypes";

interface InitialState {
  tableData: never[];
  tableHeaders: string[];
  itemsPerPage: number;
  pageIndex: number;
}

const initialState = {
  tableData: [],
  tableHeaders: ["id", "origin", "destination", "status", ""],
  itemsPerPage: 20,
  pageIndex: 0,
};

const shipmentListReducer = (state = initialState, action): InitialState => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_SUCCESS:
      return { ...state, tableData: action.tableData };
    case actionTypes.FETCH_DATA_ERROR:
      return { ...state, tableData: [] };
    case actionTypes.CHANGE_PAGE_INDEX:
      return { ...state, pageIndex: action.pageIndex };
    default:
      return state;
  }
};
export default shipmentListReducer;
