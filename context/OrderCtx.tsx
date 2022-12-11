import { createContext } from 'react'
import { OrderState, Product } from '../interfaces'
import { ClientType } from '../interfaces';

type OrderCtxProps = {
    orderState : OrderState
    selectClient : (client : ClientType) => void
    selectProduct : (product : Product[]) => void
    selectQty : (product : Product) => void
    getTotal : () => void
}

const OrderCtx = createContext<OrderCtxProps>({} as OrderCtxProps)

export default OrderCtx