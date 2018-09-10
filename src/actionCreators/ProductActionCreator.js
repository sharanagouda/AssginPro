import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_FAILURE,
    SEARCH_PRODUCT_SUCCESS,
} from "./../actionTypes/ProductActionType";

export function getProducts(page, limit) {
    return {
        type: GET_PRODUCTS,
        page,
        limit
    }
}

export function getProductsSuccess(products) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products
    }
}

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error
    }
}

export function searchedProducts(products, productsName){
    return{
         type: SEARCH_PRODUCT,
        products:products,
        productsName:productsName
       
    }
}
export function searchedRequestProducts(products, productName){
    return{
        type: SEARCH_PRODUCT_REQUEST,
        products:products,
        productsName:productName
       
    }
}
export function searchProductsSuccess(products) {
    return {
        type: SEARCH_PRODUCT_SUCCESS,
        products
    }
}

export function searchProductsFailure(error) {
    return {
        type: SEARCH_PRODUCT_FAILURE,
        error
    }

}