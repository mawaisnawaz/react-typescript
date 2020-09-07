import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
export default store;
