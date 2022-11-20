import { FC } from 'react'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'


export const Sidebar: FC = () => {
    const router : NextRouter = useRouter();
    return (
        <aside className="bg-gray-900 shadow-md pt-4 sm:w-1/3 xl:w-1/5 sm:min-h-screen">
            <div>
                <Link href="/">
                    <h1 className="text-white font-black tracking-widest text-center text-xl mt-3 island-moments">CRM</h1>
                    <p className="text-xs text-white text-center italic mt-2">Sellers & Clients</p>
                </Link>
            </div>
            <nav className="mt-10 list-none">
                <li className={router.pathname === "/" ? "transition-colors duration-200 hover:bg-gray-600 bg-gray-600 bg-opacity-60 p-3" :
                    "transition-colors duration-200 hover:bg-gray-800 p-3"}>
                    <Link href="/">
                        <span className="text-white block text-2xl tracking-widest font-light transition-colors duration-300 hover:text-sky-200  ">Clients</span>
                    </Link>
                </li>
                <li className={router.pathname === "/products" ? "transition-colors duration-200 hover:bg-gray-600 bg-gray-600 bg-opacity-60 p-3" :
                    "transition-colors duration-200 hover:bg-gray-800 p-3"}>
                    <Link href="/products">
                        <span className="text-white block text-2xl tracking-widest font-light transition-colors duration-300 hover:text-sky-200  ">Products</span>
                    </Link>
                </li>
                <li className={router.pathname === "/orders" ? "transition-colors duration-200 hover:bg-gray-600 bg-gray-600 bg-opacity-60 p-3" :
                    "transition-colors duration-200 hover:bg-gray-800 p-3"}>
                    <Link href="/orders">
                        <span className="text-white block text-2xl tracking-widest font-light transition-colors duration-300 hover:text-sky-200  "> Orders </span>
                    </Link>
                </li>
            </nav>
            <nav className="sm:mt-10 list-none">
                <h1 className="text-white mb-5 font-black px-4 text-center island-moments">Reports</h1>
                <li className={router.pathname === "/best-sellers" ? "transition-colors duration-200 hover:bg-gray-600 bg-gray-600 bg-opacity-60 p-3" :
                    "transition-colors duration-200 hover:bg-gray-800 p-3"}>
                    <Link href="/best-sellers">
                        <span className="text-white block text-2xl tracking-widest font-light transition-colors duration-300 hover:text-sky-200  ">Best Sellers</span>
                    </Link>
                </li>
                <li className={router.pathname === "/best-clients" ? "transition-colors duration-200 hover:bg-gray-600 bg-gray-600 bg-opacity-60 p-3" :
                    "transition-colors duration-200 hover:bg-gray-800 p-3"}>
                    <Link href="/best-clients">
                        <span className="text-white block text-2xl tracking-widest font-light transition-colors duration-300 hover:text-sky-200  ">Best Clients</span>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}
