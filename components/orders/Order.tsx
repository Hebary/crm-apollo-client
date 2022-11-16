import React, { useState, useEffect } from 'react'
import { OrderType, Product } from '../../interfaces'
import { format } from 'date-fns'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2';


const UPDATE_ORDER = gql`
    mutation updateOrder($id: ID!, $input: OrderInput!){
        updateOrder(id: $id, input: $input){
            status
        }
    }

`;

const DELETE_ORDER = gql`
    mutation deleteOrder($id: ID!){
        deleteOrder(id: $id)
    }
`;

interface OrderProps { order: OrderType }
type BorderClass = 'border-yellow-400' | 'border-green-500' | 'border-red-500' | ''
type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELED' | undefined | string


export const Order: JSX.Element | any = ({ order }: OrderProps) => {
    console.log()
    const [updateOrder] = useMutation(UPDATE_ORDER)
    const [deleteOrder] = useMutation(DELETE_ORDER, {
        update(cache) {
            // this method evicts from the cache the order that was deleted providing the id for it
            cache.evict({ id: `Order:${order.id}` })
        }
    })

    const [classes, setClasses] = useState<BorderClass>('')
    const [status, setStatus] = useState<OrderStatus>(order.status)


    useEffect(() => {
        if (status) {
            setStatus(status)
        }
        borderClass()
    }, [status])

    const borderClass = () => {
        if (status === 'PENDING') {
            setClasses('border-yellow-400')
        } else if (status === 'COMPLETED') {
            setClasses('border-green-500')

        } else {
            setClasses('border-red-500')
        }
    }

    const updateStatus = async (newStatus: OrderStatus) => {

        try {
            const { data } = await updateOrder({
                variables: {
                    id: order.id,
                    input: {
                        status: newStatus,
                        client: order.client.id
                    }
                }
            })
            setStatus(data.updateOrder.status)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOrderById = async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => { // doing then async
            if (result.isConfirmed) {

                try {
                    const { data } = await deleteOrder({
                        variables: {
                            id: order.id
                        }
                    })
                    // console.log(data)
                    Swal.fire(
                        'Deleted!',
                        data.deleteOrder,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }


    return (
        <div className={` ${classes} animate-2 border-t-4 mt-4 bg-gray-300 rounded p-6 md:grid md:grid-cols-2 md:gap-6 shadow-lg `}>
            <div>
                <p className="text-gray-900 mb-5 p-1  font-bold">
                    Client: {order.client && order.client.name} {order.client && order.client.lastname}
                </p>
                {order.client && (
                    <p className="text-black text-xl font-light mb-5 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        {order.client.email}
                    </p>
                )}
                {order.client && (
                    <p className="text-black text-xl flex items-center gap-3 font-light">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        {order.client.phone}
                    </p>
                )}
                <p className=" p-1 inline-block rounded-lg text-gray-900 text-sm  font-bold mt-4">Company :<span className="font-light"> {order?.client?.company} </span></p>
            </div>
            <div>
                <div>
                    <h2 className="text-black inline-block text-lg font-light">Order status:</h2>

                    <select className="mt-2 font-bold bg-gray-800 px-5 m-2 border border-blue text-center leading-tight p-2 text-white rounded focus:outline-none focus:border-blue-500 text-xs appearance-none cursor-pointer"
                        value={status}
                        onChange={(e) => updateStatus(e.target.value)}
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELED">CANCELED</option>
                    </select>
                </div>
                <div>
                    <h2 className="text-black font-light text-lg mt-5 ">Order resume:</h2>
                    <ul className="mt-5">
                        {order.order.map((product: any) => (
                            <li key={product.id} className="bg-gray-400 border p-3 flex justify-between flex-wrap items-center mb-4 shadow-lg">
                                <div className="flex items-center">
                                    <p className="text-sm font-bold text-gray-800">{product.name}</p>
                                    <p className="text-xs text-gray-900 m-3">Quantity: {product.qty}</p>
                                </div>
                                <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-black p-2 pb-4 border-b border-gray-600 text-right mt-5 text-xl tracking-widest">Total: $ {order.total.toFixed(2)}</p>
                </div>

                <div className="sm:flex flex-wrap justify-between gap-3 items-center">
                    <div className="flex justify-between gap-2 items-center">
                        <h2 className="text-black font-light text-lg mt-5">Order date:</h2>
                        <p className="text-gray-800 font-sans leading-tight mt-5">{format(Number(order.createdAt), 'yyyy-MM-dd HH:mm:ss')}</p>
                    </div>
        

                        <button className="leading-tight text-xs uppercase px-5 hover:bg-red-800 w-lg-auto mt-5 p-2 text-white font-bold bg-red-600 transition-colors duration-300 rounded shadow-md"
                            onClick={deleteOrderById}>
                            Delete order
                        </button>
                </div>
            </div>



        </div>

    )
}

