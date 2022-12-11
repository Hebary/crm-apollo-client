import {FC, useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import OrderCtx from '../../context/OrderCtx';

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

`;

import { ClientType } from '../../interfaces';

export const ClientAsignment: FC = () => {

  const { data, loading, error } =  useQuery(GET_CLIENTS_BY_SELLER);

  // console.log(data);

  const { selectClient } = useContext(OrderCtx)

  const [ client, setClient ] = useState({});

  useEffect(() => {
    selectClient(client as ClientType)
  }, [client]);

  const selectOneClient = (client : ClientType) : void => {
    setClient(client);
  }

  if(loading) return null;
  const { getClientsBySeller } = data;


  return (
    <>
      <p className=" text-white font-black tracking-widest my-5">Follow the steps</p>
      <p className="font-bold text-white tracking-widest text-sm mb-3 px-5 py-2 bg-gray-500 border-l-4 border-black w-auto text-center">1. Select client</p>
      <Select
        options={getClientsBySeller}
        onChange={(c) => selectOneClient(c as ClientType)}
        // isMulti={true}
        placeholder="Select Client"
        getOptionValue={(options)=> options.id}
        getOptionLabel={(options : any)=> options.name}
        />
    </>
  )
}
