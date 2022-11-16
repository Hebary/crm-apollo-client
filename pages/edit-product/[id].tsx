import React, { FC } from 'react';
import { Layout } from '../../components/layout';
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const GET_PRODUCT = gql`
    query getOneProduct($id: ID!) {
        getOneProduct(id: $id) {
            name
            price
            existence
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $input: ProductInput) {
            updateProduct(id: $id, input: $input) {
                id
                name
                existence
                price
            }
    }
`;

const EditProduct = ()=> {

    const router = useRouter();
    const { query: { id } } = router;
    // console.log(id)

    // Consultar para obtener el producto
    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            id
        }
    });

    // Mutation para modificar el producto
    const [ updateProduct ] = useMutation(UPDATE_PRODUCT);

    // Schema de validación
    const schemaValidacion = Yup.object({
        name: Yup.string() 
                    .required('Name field is required'), 
        existence: Yup.number()
                    .required('Add the available quantity')
                    .positive('Unaccepted negative numbers')
                    .integer('Existence field must be positive'),
        price: Yup.number()
                    .required('Price field is required')
                    .positive('Unaccepted negative numbers')
    });


    // console.log(data)
    // console.log(loading)
    // console.log(error)

    if(loading) return 'Loading...';

    if(!data) { 
        return 'Action not allower';
    }

    const updateOneProduct = async (values : any) => {
        // console.log(valores);
        const { name, existence, price } = values;
        try {
            const {data} =  await updateProduct({
                variables: {
                    id, 
                    input: {
                        name,
                        existence,
                        price
                    }
                }
            });
            console.log(data);

            // Reidrect to products
            router.push('/products')

            // Show the alert
            Swal.fire(
                'Success',
                'Product updated successfully',
                'success'
            )
            
        } catch (error) {
            console.log(error);
        }
    }

    const { getOneProduct } = data;

    return ( 
        <Layout>
            <h1 className="text-2xl text-white tracking-wider font-light">Edit one product</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik 
                        enableReinitialize
                        initialValues={getOneProduct}
                        validationSchema={ schemaValidacion }
                        onSubmit={ async values => {
                            await updateOneProduct(values)
                        }} 
                    >

                        {props => {
                            console.log(props)
                            return (

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
                                    placeholder="Product Name"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props?.values?.name}
                                />
                            </div>

                            { props.touched.name && props.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <>{props.errors.name}</>
                                </div>
                            ) : null  } 

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existence">
                                    Existence 
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="existence"
                                    type="number"
                                    placeholder="Stock"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.existence}
                                />
                            </div>

                            { props.touched.existence && props.errors.existence ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <>{props.errors.existence}</>
                                </div>
                            ) : null  } 

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                    Price
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="price"
                                    type="number"
                                    placeholder="Product Price"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.price}
                                />
                            </div>

                            { props.touched.price && props.errors.price ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <>{props.errors.price}</>
                                </div>
                            ) : null  } 

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 cursor-pointer text-white tracking-widest text-lg transition-colors duration-300 hover:bg-gray-900"
                                value="Done"
                            />
                    </form>
                    )
                }}
                    </Formik>
                </div>
            </div>
        </Layout>
     );
}
 
export default EditProduct;