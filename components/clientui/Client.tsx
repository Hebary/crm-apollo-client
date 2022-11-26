import { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import Router from 'next/router'

interface ClientProps {
    client: {
        name: string
        lastname: string
        company: string
        email: string
        phone?: string
        id: string
    }
}

const DELETE_CLIENT = gql`
    mutation deleteClient( $id: ID! ){
        deleteClient( id: $id )
    }
`;

export const Client: FC<ClientProps> = ({ client }: ClientProps) => {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update(cache) {
            // this method evicts from the cache the client that was deleted providing the id for it
            cache.evict({ id: `Client:${client.id}` })
        }
    })

    const { name, lastname, phone, company, email, id } = client

    const confirmDeleteClient = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => { // doing then async
            if (result.isConfirmed) {

                try {
                    // delete by current global client ID
                    const { data } = await deleteClient({
                        variables: {
                            id
                        }
                    })
                    Swal.fire(
                        'Deleted!',
                        data.deleteClient,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }
    const editClient = () => {
        Router.push({
            pathname: '/edit-client/[id]',
            query: { id }
        })
    }

    return (
        <div key={id} className="grid sm:grid-cols-2 px-4 bg-top cursor-pointer  border-b border-gray-700 p-2">
            <div>
                <p className=" md:px-4 py-2 text-lg md:text-xl text-gray-100 font-light sm:tracking-widest">
                    <span className='text-white  mr-2 font-bold text-lg'>Name:</span>{name} {lastname}
                </p>
                <p className=" md:px-4 py-2 text-lg md:text-xl text-gray-100 font-light sm:tracking-widest">
                    <span className='text-white  mr-2 font-bold text-lg'>Company:</span>{company}
                </p>
                <p className=" md:px-4 py-2 text-lg md:text-xl text-gray-100 font-light sm:tracking-widest">
                    <span className='text-white  mr-2 font-bold text-lg'>Email:</span>{email}
                </p>
                {
                    phone && <p className=" md:px-4 py-2 text-lg md:text-xl text-gray-100 font-light sm:tracking-widest">
                        <span className='text-white  mr-2 font-bold text-lg'>Phone:    </span>{phone}
                    </p>
                }
            </div>
            <div className="flex items-start mt-3 mb-5 gap-2 max-w-sm  ">
                <button
                    type="button"
                    className="flex justify-center items-center sm:mr-3 border transition-colors duration-300 hover:bg-red-600 py-2
                     px-3 w-full text-white rounded text-xs uppercase tracking-widest gap-3"
                    onClick={confirmDeleteClient}>
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="flex justify-center sm:mr-3 items-center border transition-colors duration-300 hover:bg-green-700 
                    py-2 px-3 w-full text-white rounded text-xs uppercase tracking-widest gap-3"
                    onClick={editClient}>
                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
