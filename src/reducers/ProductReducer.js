import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE
} from "./../actionTypes/ProductActionType";

export default (prevState = {
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit: 8,
    searchProduct:''
}, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: prevState.products.length > 0 ? false:true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                product: action.product
            }
            case GET_PRODUCTS_FAILURE:
        case SEARCH_PRODUCT:
        return {
            ...prevState,
            isLoading: false,
            searchProduct:action.searchProduct,
            filteredAllProducts: action.products.filter(function(item) {
            return (
                item.title.toLowerCase().search(action.productsName.toLowerCase()) !==
                -1
            );
            })
        };
        case SEARCH_PRODUCT_REQUEST:
        
            return {...prevState,
                isLoading: false,
                searchProduct: action.searchProduct
            };
        case SEARCH_PRODUCT_SUCCESS:
            return {
                ...prevState,
                // isLoading:false,
                products:prevState.products.concat(action.products)
            }
        case SEARCH_PRODUCT_FAILURE:
        default:
            return prevState;

    }
}