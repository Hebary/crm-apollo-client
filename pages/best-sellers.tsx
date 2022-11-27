import React, { useEffect } from 'react'
import { Layout } from '../components/layout'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const GET_BEST_SELLERS = gql`
    query getBestSellers {
        getBestSellers {
            seller {
                name
                email
            }
            total
        }
    }
`;  	
const BestSellers : React.FC = () =>  {

    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_BEST_SELLERS);


    useEffect(() => {
        // if theres a change in the data, then startPolling will get new Data
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])


    const sellerGraph : any = [];
    data?.getBestSellers.map((seller : any, index : any)  => {
        sellerGraph[index] = {
            ...seller.seller[0],
            total: seller.total
        }
    })


    return (
        <Layout>
            <h1 className="font-light text-white text-2xl tracking-widest">Best Sellers</h1>
            
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart
                        className='mt-10'
                        width={500}
                        height={300}
                        data={sellerGraph}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#6182CE" />
                    </BarChart>
                </ResponsiveContainer>
        </Layout>
    )
}



export default BestSellers
