import { createContext } from 'react'
import { OrderState, Product, Products } from '../interfaces'
import { Client } from '../interfaces';

type OrderCtxProps = {
    orderState : OrderState
    selectClient : (client : Client) => void
    selectProduct : (product : Product[]) => void
    selectQty : (product : Product) => void
    getTotal : () => void
}

const OrderCtx = createContext<OrderCtxProps>({} as OrderCtxProps)

export default OrderCtx