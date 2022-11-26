import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import Link from 'next/link'
import { Layout } from '../components/layout'
import { Order } from '../components/orders';
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

export default function Orders() : JSX.Element{

  const { data ,loading } = useQuery(GET_ORDERS);
  return (
    <Layout>
      <h1 className="font-light text-white text-2xl">Orders</h1>
      <Link href="/create-order">
        <span className="bg-gray-800 py-2 px-5 mt-3 inline-block text-white text-sm transition-colors duration-300 hover:bg-gray-900 mb-3 font-bold w-full lg:w-auto text-center">New Order</span>
      </Link>
      { 
        loading ? <p className="text-white">Loading...</p> :
        data?.getOrdersBySeller.length === 0 ? <p className="text-white">No orders yet</p> :
        data?.getOrdersBySeller.map((order : OrderType) => (
         <Order 
          key={order.id}
          order={order}
         />
        ))
      }
    </Layout>
  )
}