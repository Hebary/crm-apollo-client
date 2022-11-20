import { NextPage } from 'next'
import { Layout } from '../components/layout'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link';
import { Client } from '../components/clientui'
import { useEffect } from 'react';

const Home: NextPage | any = () => {



  interface Client {
    id: string
    name: string
    lastname: string
    company: string
    email: string
    phone: string
  }


  const GET_CLIENTS_BY_SELLER = gql`
  query getClientsBySeller{
    getClientsBySeller{
      name
      lastname
      email
      company
      id
  }
}

`
//Apollo query
const { data, loading, error, startPolling, stopPolling } = useQuery(GET_CLIENTS_BY_SELLER);

useEffect(() => {
  startPolling(500)
  return () => {
    stopPolling()
  }
}, [startPolling, stopPolling])
if(loading) return 'loading.....'
    if(!data) return null
  const { getClientsBySeller } = data
  
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-white font-light">Clients</h1>
        <Link href="/create-client">
          <span className="bg-gray-800 py-2 px-5 mt-3 inline-block text-white text-sm transition-colors duration-300 hover:bg-gray-900 mb-3 font-bold w-full    lg:w-auto text-center">New Client</span>
        </Link>

        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full animate-2 w-lg">
            <thead className="bg-gray-900">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Company</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2 ">Delete</th>
                <th className="w-1/5 py-2">Edit</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {getClientsBySeller?.map((client : Client) => (
                <Client
                  key={client.id}
                  client={client}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}
export default Home;