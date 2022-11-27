import { gql, useQuery } from '@apollo/client'
import { FC, useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import OrderCtx from '../../context/OrderCtx'

const GET_PRODUCTS = gql `

query getProducts{
    getProducts{
        name
        price
        existence
        id
    }
  }
  `;

export const ProductAsignment : FC = () => {
    
    const { data, loading, error } = useQuery(GET_PRODUCTS);
 
    const { selectProduct  } = useContext(OrderCtx)

    const [ products, setProducts ] = useState([]);
  
    useEffect(() => {
        selectProduct(products as any)
    }, [products]);
  
    const selectOneProduct = (product : any ) : void => {
        setProducts(product);
    }

    if(loading) return null;
    const { getProducts } = data;
  
    return (
        <>
          <p className="font-bold text-black text-sm mt-10 mb-3 px-5 py-2 bg-gray-500 border-l-4 border-black w-auto text-center">2. Select products</p>
          <Select
            options={getProducts}
            onChange={(c) => selectOneProduct(c)}
            isMulti={true}
            placeholder="Select Products"
            getOptionValue={(options : any)=> options.id}
            getOptionLabel={(options : any)=> `${options.name} - ${options.existence} availables`}
            />
        </>
      )
    }
    