import React, { useEffect } from 'react'
import { Layout } from '../components/layout'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';

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
const BestSellers : NextPage | any = ()=> {

    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_BEST_SELLERS);


    useEffect(() => {
        // if theres a change in the data, then startPolling will get new Data
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if(loading) return 'Loading...';
    if(!data) return 'Loading...'

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

const data = [
    {
        name: 'Page A',
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        pv: 4300,
        amt: 2100,
    },
];







export default BestSellers
