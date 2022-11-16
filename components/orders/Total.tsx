import { FC, useContext, useEffect, useState } from 'react'
import OrderCtx from '../../context/OrderCtx';

export const Total: FC = () => {

    const { orderState : {total} } = useContext(OrderCtx)

    return (
        <div className="flex items-center my-5 border border-black  justify-between bg-gray-500 p-3">
            <h2 className="font-bold text-white">Total</h2>
            <p className="text-white font-bold">${ total }</p>
        </div>
    )
}
