import { FC, useContext } from "react"
import OrderCtx from "../../context/OrderCtx"
import { Product } from "../../interfaces"
import { SummaryProduct }from "./SummaryProduct"


export const Summary : FC = () => {
  const { orderState : { products} } = useContext(OrderCtx)
  
  return (
    <>
          <p className="font-bold text-black text-sm mt-10 mb-3 px-5 py-2 bg-gray-500 border-l-4 border-black w-auto text-center">3. Select quantities</p>
          { products.length > 0 ?  (
            <>
              {products.map((product : Product) => (
                  <SummaryProduct
                    key={product.id}
                    product={product}
                  />
              ))}
            </>
          ) : (
            <p className="mt-5 text-sm text-gray-300">No products here</p>
          )}

    </>
  )
}
