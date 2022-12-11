import { Layout } from '../components/layout'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link';
import { Client } from '../components/ui'
import React from 'react';
import { ClientType } from '../interfaces';



const GET_CLIENTS_BY_SELLER = gql`
query getClientsBySeller{
  getClientsBySeller{
    name
    lastname
    email
    phone
    company
    id
  }
}
`;

const IndexPage : React.FC = () : JSX.Element => {
  //Apollo query
  const { data, loading } = useQuery(GET_CLIENTS_BY_SELLER);

  return (
    <>
      {loading ? 'Loading...' :
        <Layout>
          <h1 className="text-2xl text-white font-light">Clients</h1>
          <Link href="/create-client">
            <span className="py-2 px-5 mt-3 inline-block text-white text-sm transition-colors rounded-md duration-300 hover:bg-gray-900 mb-3 font-bold w-full border border-gray-600 lg:w-auto text-center">New Client</span>
          </Link>
          <div className="shadow-md mt-10 animate-2 w-lg">
              {
                data?.getClientsBySeller?.length !== 0 ?
                <div className="border border-b-0 border-gray-700">
                { data?.getClientsBySeller?.map( (client: ClientType) => (
                  <Client
                  key={client.id}
                  client={client}
                  />
                  ))}
              </div>: <p className="text-white text-center p-5">No clients yet</p>
              }
          </div>
        </Layout>
      }
    </>
  )
}

export default IndexPage