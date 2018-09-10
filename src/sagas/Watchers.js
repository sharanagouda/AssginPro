import { takeLatest } from 'redux-saga';
import searchedProducts from './ProductSaga';
import {SEARCH_PRODUCT} from './../actionTypes/ProductActionType'

export default function* watchSearchedProduct() {
  yield* takeLatest(SEARCH_PRODUCT, searchedProducts);
}