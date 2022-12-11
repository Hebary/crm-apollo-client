import { useReducer } from "react";
import OrderCtx from "./OrderCtx";
import OrderReducer from "./OrderReducer";
import { ClientType, OrderState, Product } from "../interfaces";
import { CLIENT_ASIGNMENT, SELECT_PRODUCT, QTY_PRODUCTS, TOTAL_UPDATE } from '../types'

const initialState : OrderState = {
    client: {} as ClientType,
    products: [],
    total: 0
}

interface OrderProviderProps {
    children : JSX.Element | JSX.Element[]
}

const OrderProvider = ( {children} : OrderProviderProps ) => {

    const [ orderState, dispatch ] = useReducer(OrderReducer, initialState);


    const selectClient = (client : ClientType) => {
        dispatch({
            type: CLIENT_ASIGNMENT,
            payload: client
        })
    }

    const selectProduct = (selectedProducts : Product[]) => {
        //save the selected products in the state
        let newProducts : Product[] = [];
        if(orderState.products.length > 0) {
            newProducts = selectedProducts.map((product) => {
                const newObject = orderState.products.find((productState : Product) => productState.id === product.id);
                return {...product, ...newObject}
            })
        } else {
            newProducts = selectedProducts
        }
        
        dispatch({
            type: SELECT_PRODUCT,
            payload: newProducts,
            
        })

    }

    const selectQty = (product : Product) => {
        dispatch({
            type: QTY_PRODUCTS,
            payload: product
        })
    }

    const getTotal = () => {
            dispatch({
                type: TOTAL_UPDATE,
                payload: null
        })
    }

    return(
        <OrderCtx.Provider
            value={{
                orderState,
                selectClient,
                selectProduct,
                selectQty,
                getTotal
            }}
        >
            {children}
        </OrderCtx.Provider>
    )
}

export default OrderProvider