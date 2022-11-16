import { FC, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client'
import { NextRouter, useRouter } from 'next/router';
import { RouteLoader } from 'next/dist/client/route-loader';
import { HookCallbacks } from 'async_hooks';

const GET_USER: any = gql`
query getUser{
    getUser{
      name
      lastname
      id
    }
  }`

export const Header: FC = () => {

    const router: NextRouter = useRouter();

    // Apollo query
    const { data, loading, error } = useQuery(GET_USER);

   
    

    if (loading) return null;

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }


    return (
                <div className="sm:flex sm:justify-between w-full mb-7 ">
                    <p className="mr-2 mb-5 lg:mb-0 text-white text-lg   tracking-wide">Hi: {data?.getUser?.name} {data?.getUser?.lastname}
                    </p>
                    <button
                        onClick={() => logout()}
                        type="button"
                        className="bg-black w-full sm:w-auto font-light tracking-widest px-2 text-xs py-1 text-white shadow-md hover:bg-gray-900 transition-colors duration-300"
                    >
                        Log out
                    </button>
                </div>

    );
}
