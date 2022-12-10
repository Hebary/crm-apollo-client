import React, { FC, useState } from 'react';
import { Layout } from '../components/layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router'
import { NextPage } from 'next';
import { Alert } from '../components/ui';
import { Client } from '../interfaces';





const NEW_CLIENT = gql`
    mutation newClient($input : ClientInput!){
        newClient(input:$input){
            name
            lastname
            seller
            email
            createdAt
            company
            phone
            id
        }
    }
`;

const GET_CLIENTS_BY_SELLER = gql`
    query getClientsBySeller {
        getClientsBySeller {
            id
            name
            lastname
            company      
            email
        }
    }
`;
const CreateClient : React.FC = () : JSX.Element => {

    const router : NextRouter = useRouter();

    //Alert msgs
    const [alert, setAlert] = useState<string | any>();

    // Mutation for create new clients
        const [ newClient ] =  useMutation( NEW_CLIENT, {
            update(cache, { data: { newClient  } } ) {
            // get current cache object that we would like to update
            const { getClientsBySeller } : Client[] | any = cache.readQuery({ query: GET_CLIENTS_BY_SELLER });
            // Overwrite cache  (the cache never must be changed, only overwritten) 
            cache.writeQuery({
                query: GET_CLIENTS_BY_SELLER,
                data: {
                    getClientsBySeller : [...getClientsBySeller, newClient ]
                }
            })
        }
    })


    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            company: '',
            email: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string() 
                        .required('Field name is required'),
            lastname: Yup.string() 
                        .required('Field lastname is required'),
            company: Yup.string() 
                        .required('Field company is required'),
            email: Yup.string()
                        .email('Email not valid') 
                        .required('Email is required'),
        }), 
        onSubmit: async values => {
            const { name , lastname, company, email, phone } = values

            try {
                const { data } = await newClient({
                    variables: {
                        input: {
                            name,
                            lastname, 
                            company, 
                            email, 
                            phone
                        }
                    }
                });
                console.log(data.newClient);
                setAlert('Client created successfully');

                // redirect to clients
                setTimeout(() => {
                    setAlert('');
                    router.push('/');
                }, 3000);


            } catch (error : any) {
                setAlert(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => setAlert(''), 3000);
            }
        }
    })

    
    return ( 
        <Layout>
        <h1 className="font-light text-white text-2xl tracking-widest">New Client</h1>

            {alert && <Alert message={alert} />}

            <div className="flex justify-center mt-5 animate">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>

                                <input
                                    autoFocus
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Client Name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                            </div>

                            { formik.touched.name && formik.errors.name ? (
                                <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Lastname
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastname"
                                    type="text"
                                    placeholder="Client Lastname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastname}
                                />
                            </div>

                            { formik.touched.lastname && formik.errors.lastname ? (
                                <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.lastname}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                    Company
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="company"
                                    type="text"
                                    placeholder="Client Company"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.company}
                                />
                            </div>

                            { formik.touched.company && formik.errors.company ? (
                                <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.company}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Client Email "
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Phone
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="tel"
                                    placeholder="Client phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                            </div>

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white tracking-wider text-lg cursor-pointer transition-colors duration-200 hover:bg-gray-900"
                                value="Done"
                            />
                    </form>
                </div>
            </div>
        </Layout>
        
     );
}
 

export default CreateClient