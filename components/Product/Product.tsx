import { FC } from "react"
import { gql, useMutation } from "@apollo/client"
import Swal from 'sweetalert2'
import Router from 'next/router'

interface ProductProps {
    product: {
        name: string
        existence: number
        price: number
        id: string
    }
}

const DELETE_PRODUCT = gql`
    mutation deleteProduct($id:ID!){
        deleteProduct(id:$id)
    }
`
export const Product: FC<ProductProps> = ({ product }: ProductProps) => {

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        update(cache) {
            // this method evicts from the cache the product that was deleted providing the id for it
            cache.evict({ id: `Product:${product.id}` })
        }
    })

    const confirmDeleteProduct = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await deleteProduct({
                        variables: {
                            id: product.id
                        }
                    })
                    Swal.fire(
                        'Deleted!',
                        data.deleteProduct,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const { name, existence, price, id } = product

    const editProduct = () => {
        Router.push({
            pathname: "/edit-product/[id]",
            query: { id }
        })

    }
    return (
        <tr className='bg-top' key={id}>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2">{existence}</td>
            <td className="border px-4 py-2">{price}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center  bg-red-500 transition-colors duration-300  hover:bg-red-600 py-2 px-4 w-full text-white rounded text-xs uppercase tracking-widest gap-3 "
                    onClick={confirmDeleteProduct}
                >
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-green-600 transition-colors duration-300 hover:bg-green-700 py-2 px-4 w-full text-white rounded text-xs uppercase tracking-widest gap-3"
                    onClick={editProduct}
                >
                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}
