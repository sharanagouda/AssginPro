import React, {Component} from 'react';
import rootReducer from "./src/reducers/index";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import AppWithNavigationState from "./src/containers/Navigatior";
import createSagaMiddleware from "redux-saga";
import {productWatchers} from "./src/sagas/ProductSaga";
import {rootSaga} from "./src/sagas/index";
const sagaMiddleware = createSagaMiddleware();
let store=createStore(
  rootReducer,
  {
    productState: { 
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    filteredAllProducts: [],
    page: 1,
    limit:20,
    searchProduct:''
 },
  },
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(productWatchers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <AppWithNavigationState/>
      </Provider>
        );
   }
}