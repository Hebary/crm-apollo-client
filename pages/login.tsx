import React, {useEffect, useState} from 'react';
import { Layout } from '../components/layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router'
import { Alert } from '../components/ui';
import Link from 'next/link';

const AUTH_USER = gql`
  mutation authUser($input: AuthInput){
    authUser(input: $input){
      token
    }
  }
`;



const Login : React.FC  = () : JSX.Element => {

    // routing
    const router : NextRouter = useRouter();
    

    const [alert, setAlert] = useState<string>();

    // Mutation to create new Users in apollo
    const [ authUser ] = useMutation(AUTH_USER);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('Thats a not valid email')
                        .required('Email field is required'),
            password: Yup.string()
                        .required('Password field is required')
        }), 
        onSubmit: async values => {
            const { email, password } = values;

            try {
                const { data } = await authUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });
                setAlert('Checking data...');

                // Save token in storage
                const { token } = data.authUser;
                localStorage.setItem('token', token);
             
                // Redirect to clients page
                setTimeout(() => {
                    router.push('/');
                }
                , 1500);

            } catch (error : any) {
                setAlert( error.message.replace('GraphQL error: ', '') );
                
                setTimeout(() => {
                  setAlert('');
                }, 3000);
            }
        }
    })



    const showMessage = () : Element | Element[] | any => {
      return (
          <Alert message={alert}/>
      )
  }


    return ( 

        <>
            <Layout>

              {alert && showMessage() }
              <h1 className="text-center text-3xl text-white font-light">Login</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>

                                <input
                                    autoFocus
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null  }

                            <input
                                type="submit"
                                className="transition-colors duration-300 bg-gray-800 w-full mt-5 p-2 text-white hover:cursor-pointer hover:bg-gray-900"
                                value="Log in"
                            />
                            <div>
                                <p className="text-center text-sm mt-5">Don't have an account?
                                    <Link href="/create-account" className="text-blue-800 ml-3 hover:text-black">Create account</Link>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </Layout>
        </>
     );
}
 
export default Login;
