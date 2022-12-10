import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import React from 'react';
import { Layout } from '../components/layout'
import { Order } from '../components/ui';
import { OrderType } from '../interfaces';

const GET_ORDERS = gql`
  query getOrdersBySeller{
    getOrdersBySeller{
      id
      client{
        name
        email
        phone
        lastname
        id
        company
      }
      order{
        id
        qty
        name
        price
      }
      total
      seller
      createdAt
      status
    }
  }
`;

const Orders : React.FC = () : JSX.Element => {


  const { data ,loading } = useQuery(GET_ORDERS);
  return (
    <Layout>
      <h1 className="font-light text-white text-2xl">Orders</h1>
      <Link href="/create-order">
        <span className="bg-gray-800 border border-gray-600 rounded-md py-2 px-5 mt-3 inline-block text-white text-sm transition-colors duration-300 hover:bg-gray-900 mb-3 font-bold w-full lg:w-auto text-center">New Order</span>
      </Link>
      { 
        loading ? <p className="text-white">Loading...</p> :
        data?.getOrdersBySeller?.length === 0 ? <p className="text-white">No orders yet</p> :
        data?.getOrdersBySeller?.map((order : OrderType) => (
         <Order 
          key={order.id}
          order={order}
         />
        ))
      }
    </Layout>
  )
}

export default Orders