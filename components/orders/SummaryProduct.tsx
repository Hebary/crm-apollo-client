import { useContext, useEffect, useState } from "react"
import OrderCtx from "../../context/OrderCtx"
import { Product } from '../../interfaces'

interface SummaryProductProps {
  product: Product
}

export const SummaryProduct: JSX.Element | any = ({ product }: SummaryProductProps) => {

  const { orderState: { products }, selectQty, getTotal } = useContext(OrderCtx)
  const [quantity, setQty] = useState(0);

  useEffect(() => {
    updateQty()
    getTotal()
  }, [quantity])

  const updateQty = () => {
    const productToUpdate = {...product, qty: quantity}
    selectQty(productToUpdate)
  }


  return (
    <div className="flex justify-between items-center mt-5">
      <div className="w-1/2">
        <p className="text-sm font-semibold text-white">{product.name}</p>
        <p className="text-white">$ {product.price}</p>
      </div>
      <input
        type="number"
        placeholder="Quantity"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => setQty(Number(e.target.value))}
        value={quantity}
      />
    </div>
  )
}

