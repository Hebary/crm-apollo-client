import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { Layout } from '../components/layout';
import { Alert } from '../components/ui'
import Link from 'next/link';

const NEW_ACCOUNT = gql`
  mutation newUser($input : UserInput!){
    newUser(input: $input){
      name
      lastname
      email
      id
  }
}
`;

const CreateAccount: React.FC = () : JSX.Element => {


  
    // State para el mensaje
    const [alert, setAlert] = useState<string>();

    // Mutation to create new User
    const [ newUser ] = useMutation(NEW_ACCOUNT);

    // Routing
    const router = useRouter();

    // Validate form
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        }, 
        validationSchema: Yup.object({
            name: Yup.string()
                        .required('Name is required'), 
            lastname: Yup.string()
                        .required('Lastname is required'),
            email: Yup.string()
                        .email('Email is not valid')
                        .required('Email is required'),
            password: Yup.string()
                        .required('Password is required')
                        .min(6, 'Password must have at least 6 characters')
        }),
        
        onSubmit: async values => {
            const { name, lastname, email, password } = values

            try {
                const { data } = await newUser({
                    variables : {
                        input: {
                            name,
                            lastname,
                            email,
                            password
                        }
                    }
                });
                console.log(data);

                // User created successfully
                setAlert( 'User created successfully');
                console.log(alert);
                setTimeout(() => {
                    setAlert('');
                    router.push('/login')
                }, 3000);

            // Redirect user to login
            } catch (error : any) {
                setAlert( error.message.replace('GraphQL error: ', ''));
              console.log(error);
                setTimeout(() => {
                    setAlert('');
                }, 3000);
            }
        }
    });

    const showMessage = () : Element | any => {
        return (
            <Alert message={alert}/>
        )
    }

    return ( 
        <>
            <Layout> 
                <h1 className="text-center text-3xl animate text-white font-light">Create Account</h1>

                {alert && showMessage()}
                <div className="flex justify-center mt-5 animate">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>

                                <input
                                    autoFocus
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            { formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 animate" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                                    Lastname
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastname"
                                    type="text"
                                    placeholder="Lastname"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.lastname && formik.errors.lastname ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 animate" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.lastname}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 animate">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 animate" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null  }

                            <input
                                type="submit"
                                className="transition-colors duration-300 bg-gray-800 w-full mt-3 p-2 text-white hover:cursor-pointer hover:bg-gray-900"
                                value="Crete account"
                            />
                            <div>
                                <p className="text-center mt-5 text-sm ">Already have an account? 
                                <Link href="/login" className='ml-3 text-blue-700 hover:text-black'>Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
     );
}
 
export default CreateAccount;