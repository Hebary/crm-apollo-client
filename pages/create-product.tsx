import { gql, useMutation, useQuery } from "@apollo/client"
import Swal from 'sweetalert2'
import { NextPage } from "next"
import { Layout } from "../components/layout"
import { useFormik } from "formik"
import { Alert } from "../components/alert"
import { useState } from "react"
import { NextRouter, useRouter } from "next/router"

const CREATE_PRODUCT = gql`
    mutation newProduct($input: ProductInput!){
        newProduct(input:$input){
        id
        name
        price
        existence
        createdAt
            
        }
    } 
`

const GET_PRODUCTS = gql`
    query getProducts{
        getProducts{
            name
            existence
            price
            id
        }
    }

`

interface Alert {
    message: string | null
}

const CreateProduct: NextPage = () => {
    const [alert, setAlert] = useState<Alert>();
    const router : NextRouter = useRouter()
    // const {getProducts} = useQuery(GET_PRODUCTS);
    
    const [ newProduct ] =  useMutation( CREATE_PRODUCT, {
        update(cache, { data: { newProduct  } } ) {
        // get current cache object that we would like to update
        const { getProducts } : any = cache.readQuery({ query: GET_PRODUCTS });
        // Overwrite cache  (the cache never must be changed, only overwritten) 
        cache.writeQuery({
            query: GET_PRODUCTS,
            data: {
                getProducts : [...getProducts, newProduct ]
            }
        })
    }
})

    const formik = useFormik({
        initialValues: {
            name: '',
            existence: '',
            price: ''
        },

        onSubmit: async values => {
            const { name, existence, price } = values
            try {
                const { data } = await newProduct({
                    variables: {
                        input: {
                            name,
                            existence: Number(existence),
                            price: Number(price)
                        }
                    }
                })
                Swal.fire(
                    'Created!',
                    data.newProduct.name,
                    'success'
                )
                router.push('/products')
            } catch (error : any) {
                setAlert({
                    message: error.message
                })
                setTimeout(() => {
                    setAlert({
                        message: null
                    })
                }, 3000)
            }
        }
    })

    const showMessage = () : JSX.Element | any => {
        return (
            <Alert message={alert?.message} />
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl text-white font-light">Create new product</h1>
            {alert?.message && showMessage() }

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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Product Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                        </div>

                        {formik.touched.name && formik.errors.name ? (
                            <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                Existence
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="existence"
                                type="text"
                                placeholder="Product Existence / Stock"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existence}
                            />
                        </div>

                        {formik.touched.existence && formik.errors.existence ? (
                            <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.existence}</p>
                            </div>
                        ) : null}


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="text"
                                placeholder="Product price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                        </div>

                        {formik.touched.price && formik.errors.price ? (
                            <div className="animate my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.price}</p>
                            </div>
                        ) : null}

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white tracking-wider text-lg cursor-pointer transition-colors duration-200 hover:bg-gray-900"
                            value="Done"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
