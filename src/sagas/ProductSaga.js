import {put,all,takeLatest} from "redux-saga/effects";
import * as actionCreators from "./../actionCreators/ProductActionCreator"
import {GET_PRODUCTS,SEARCH_PRODUCT }from "./../actionTypes/ProductActionType";

let URI = "http://10.110.60.166:4000";

function* getProducts(action) {
    console.log("==============================it works in productsaga===================================================");
    try {
        let products = yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
      //  console.log(products)
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}
function* searchedProducts(action){
console.log(action);
    console.log("===== "+action);
    try {
        let products = yield fetch(`${URI}/products?price=${action.searchedProduct}`).then(r => r.json());
        console.log(products);
        yield put(actionCreators.searchProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.searchProductsFailure(error))
    }
}
export function* productWatchers() {
    yield all([takeLatest(GET_PRODUCTS, getProducts),
        takeLatest(SEARCH_PRODUCT,searchedProducts)]);
    
}