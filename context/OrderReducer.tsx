import {  Product, OrderState, ClientType } from '../interfaces';

import { CLIENT_ASIGNMENT, SELECT_PRODUCT, QTY_PRODUCTS, TOTAL_UPDATE } from '../types'

export type OrderAction =  { type: 'CLIENT_ASIGNMENT', payload: ClientType } |
                           { type: 'SELECT_PRODUCT', payload: Product[] } | 
                           { type: 'QTY_PRODUCTS', payload: Product } | 
                           { type: 'TOTAL_UPDATE', payload: number }

export const OrderReducer = (state : OrderState , action : OrderAction) => {

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
