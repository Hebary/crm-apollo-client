import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { NextRouter, useRouter } from 'next/router';

const GET_USER: any = gql`
query getUser{
    getUser{
      name
      lastname
      id
    }
  }`

export const Header: React.FC = () : JSX.Element=> {

    const router: NextRouter = useRouter();

    // Apollo query to get user data
    const { data, loading, error } = useQuery(GET_USER);

    const signOut = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

  

    return (    
                <div className="sm:flex pb-5 border-b border-gray-600 sm:justify-between w-full mb-7 ">
                    <p className="mr-2 mb-5 lg:mb-0 text-white text-lg tracking-wide">Hi: {data?.getUser?.name} {data?.getUser?.lastname}
                    </p>
                    <button
                        onClick={() => signOut()} 
                        type="button"
                        className="bg-gray-900 font-semibold w-full sm:w-auto tracking-widest px-4 text-xs py-2 rounded-lg text-white shadow-md hover:bg-black bg-opacity-70 transition-colors duration-300"
                    >
                        Sign out
                    </button>
                </div>

    );
}
