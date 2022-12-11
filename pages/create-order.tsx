import React, { useContext, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import OrderCtx from '../context/OrderCtx'
import { Layout } from '../components/layout'
import { ClientAsignment, Summary, Total } from '../components/ui';
import { ProductAsignment } from '../components/ui';
import { Alert } from '../components/ui';
import { Product } from '../interfaces';


const NEW_ORDER = gql`
    mutation newOrder($input: OrderInput!){
        newOrder(input: $input){
            id
        }
      }
    `;

const GET_ORDERS = gql`
    query getOrdersBySeller{
      getOrdersBySeller{
        id
      }
    }
  `;
  

const CreateOrder: React.FC = () : JSX.Element =>  {
    
    const router : NextRouter = useRouter();

    const [ newOrder ] = useMutation(NEW_ORDER,{
        update(cache, { data: { newOrder } }) {
            const { getOrdersBySeller } : any = cache.readQuery({ query: GET_ORDERS })
            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    getOrdersBySeller: [...getOrdersBySeller, newOrder]
                }
            })
        }
    })

    const { orderState } = useContext(OrderCtx);
    
    const [alert, setAlert] = useState<string | any>();

    const orderValidator  = () : boolean => { 
        return orderState.total > 0
    }

    const createNewOrder = async () => {
        
        const { client , total } = orderState
        const order = orderState.products.map(({__typename, existence, ...product} : Product) => product)
        const { id } : string | any  = client
        try {
            const { data } = await newOrder({
                variables: {
                    input: {
                        client: id,
                        total,
                        order
                }
            }
        })
            console.log(data)
            Swal.fire({
                title: 'Order created',
                text: 'The order has been created',
                icon: 'success',
                confirmButtonText: 'Ok'
            })

            router.push('/orders')
                } catch (error : any) {
                    console
            setAlert(error.message.replace('GraphQL error: ', ''))

            setTimeout(() => {
                setAlert('')
            }
            , 3000);
        }    
    }




    return (
        <Layout>
            <h1 className="font-light text-white text-2xl mb-5">Create Order</h1>
            <div className="flex justify-center">

                <div className="w-full max-w-lg animate-2">
                {alert && <Alert message={alert} /> }
                    <ClientAsignment />
                    <ProductAsignment />
                    <Summary/>
                    <Total/>

                    <div>
                        <button
                            type="button"
                            className={`bg-gray-900 w-full p-2 text-white font-light tracking-wider text-xl hover:bg-black 
                            transition-colors duration-300 ${orderValidator() ? "":"cursor-not-allowed opacity-20"} `}
                            onClick= {() => createNewOrder()}
                        >Create Order</button>
                    </div>

                </div>
            </div>

        </Layout>
    )
}
export default CreateOrder;
