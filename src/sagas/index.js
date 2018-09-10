import { fork, all } from 'redux-saga/effects'
import productWatchers from "./ProductSaga";
import watchSearchedProduct from './Watchers'

export default function* rootSaga(){
    yield all([
        fork(productWatchers),
        fork(watchSearchedProduct)
    ]);
}

// export default function* rootSaga(){
//     yield all(
//         [...Object.values(productWatchers), ...Object.values(searchProductWatchers)].map(fork)
//     );
// }