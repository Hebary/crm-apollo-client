import { NextRouter, useRouter } from 'next/router'
import { Layout } from '../../components/layout'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const GET_CLIENT_BY_ID = gql`

query getClientById($id: ID!){
  getClientById(id: $id){
    name
    lastname
    company
    email
    phone
  }
}
`;

const UPDATE_CLIENT = gql`
mutation updateClient($id: ID!, $input:ClientInput){
  updateClient(id:$id, input: $input){
    name
    lastname
    company
    email
    phone
}
}
`;
const EditClient : React.FC = () : JSX.Element => {

  const router : NextRouter = useRouter()

  // get current id client
  const { query: { id } } = useRouter()
  // console.log(id)

  const { data, startPolling, stopPolling} = useQuery(GET_CLIENT_BY_ID, {
    variables: {
      id
    }
  });

  useEffect(() => {
    startPolling(300)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling])
  


  const [updateClient] = useMutation(UPDATE_CLIENT);

  const schemaValidation = Yup.object({
    name: Yup.string() 
                .required('Name is required'),
    lastname: Yup.string() 
                .required('Lastname is required'),
    company: Yup.string() 
                .required('The company field is required'),
    email: Yup.string()
                .email('Email not valid') 
                .required('Email is required'),
});



  //Modify clients en la DB
  const updateInfoClient = async (values : any) => {
    const { name, lastname, company, email, phone } = values;
             
              try {
                const { data } = await updateClient({
                  variables: {
                    id,
                    input: {
                      name,
                      lastname,
                      company,
                      email,
                      phone
                    } 
                  }
                });
                console.log(data);
                
                Swal.fire(
                  'Updated!',
                  'The client has been updated.',
                  'success'
                )
                // redirect
                router.push('/')
              } catch (error) {
                console.log(error);
              }
            }

  return (
    <Layout>
      <h1 className="font-light text-white text-2xl tracking-wider">Edit Client</h1>

      <div className="flex justify-center mt-5 animate">
        <div className="w-full max-w-lg">
          {!data ? <p>Loading...</p> :
          <Formik 
            initialValues={data?.getClientById}
            enableReinitialize
            validationSchema={schemaValidation}

            onSubmit={ async (values : any) => {
              await updateInfoClient(values)
            }}
            >

            { props => (
              

                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Client Name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props?.values?.name} />
                  </div>

                  {props.touched.name && props.errors.name ? (
                    <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <>{props.errors.name}</>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                      Lastname
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastname"
                      type="text"
                      placeholder="Client Lastname"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props?.values?.lastname} />
                  </div>

                  {props.touched.lastname && props.errors.lastname ? (
                    <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <>{props.errors.lastname}</>
                    </div>
                  ) : null}


                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                      Company
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="company"
                      type="text"
                      placeholder="Client Company"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props?.values?.company} />
                  </div>

                  {props.touched.company && props.errors.company ? (
                    <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <>{props.errors.company}</>
                      
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Client Email"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props?.values?.email} />
                  </div>

                  {props.touched.email && props.errors.email ? (
                    <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                      <p className="font-bold">Error</p>
                      <>{props.errors.email}</>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="tel"
                      placeholder="Client phone"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props?.values?.phone} />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white tracking-wider text-lg cursor-pointer transition-colors duration-200 hover:bg-gray-900"
                    value="Done" />
                </form>
              )}
          </Formik>
            }
        </div>
      </div>
    </Layout>
  )
}


export default EditClient