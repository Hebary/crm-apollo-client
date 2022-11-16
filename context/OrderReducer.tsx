import {  Product, OrderState } from '../interfaces';

import { CLIENT_ASIGNMENT, SELECT_PRODUCT, QTY_PRODUCTS, TOTAL_UPDATE } from '../types'

// type OrderAction =  { type: 'CLIENT_ASIGNMENT', payload: OrderState } | { type: 'SELECT_PRODUCT', payload: string } | { type: 'QTY_PRODUCTS', payload: number } ;

export default (state : any , action : any) => {

    switch (action.type) {
        case CLIENT_ASIGNMENT:
            return {
                ...state,
                client: action.payload
            }
        case SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload

            }
        case QTY_PRODUCTS:
            return {
                ...state,
                products: state.products.map((product: Product) => product.id === action.payload.id ? product = action.payload : product)
            }
        case TOTAL_UPDATE: 
            return {
                ...state,
                total: Number(state.products.reduce((newTotal : number, product : any) => newTotal += (product.price * product.qty), 0).toFixed(2))
            }
        default:
            return state;
    }
};
