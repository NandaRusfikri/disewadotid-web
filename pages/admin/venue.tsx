import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import React, {useState} from "react";
import {useRouter} from 'next/router'
import axios from 'axios';
import Image from 'next/image'
import Link from "next/link";
import Navbar from "@/pages/navbar";


export async function getServerSideProps() {

    try {
        const ListUserResponse = await axios.post(process.env.apidomain + '/api/v1/venue/product/list', {});
        const ListVenue = ListUserResponse.data.data;



        return {props: { ListVenue}};
    } catch (error) {
        console.error(error);
        return {props: { ListVenue: []}};
    }
}

interface VenueProps {
    ListVenue: any[];
    error: any;
}

const Venue: React.FC<VenueProps> = ({ ListVenue, error}) => {
    if (error) {
        return <div>An Error {error.message}</div>
    }
    const [selectedCategory, setCategory] = useState<string | number>();


    return (
        <>
            <Head>
                <title>Sewa Lapangan Olahraga </title>
                <meta name="description" content="Sewa Lapangan Olahraga dengan jadwal"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <main>


                <div className={styles.center}>
                    <div className="mx-auto max-w-2xl py-4 px-5 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                        <Link href={`/admin/add_venue`}>
                            <button
                                className=" bg-secondary-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-5 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Tambah

                            </button>
                        </Link>








                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="pb-4 bg-white dark:bg-gray-900">
                                <label htmlFor="table-search" className="sr-only">Search</label>
                                <div className="relative mt-1">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input type="text" id="table-search"
                                           className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Search for items"/>
                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>

                                    <th scope="col" className="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Organzaion Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Venue
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {ListVenue.map((venue) => (
                                    <tr key={venue.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <th  scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {venue.id}
                                        </th>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {venue.org.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {venue.category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {venue.org.city} - {venue.org.province}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#"
                                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                ))}





                                </tbody>
                            </table>
                            <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
                                    className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span
                                    className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <a href="#"
                                           className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Previous</span>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                      clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                    </li>
                                    <li>
                                        <a href="#" aria-current="page"
                                           className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Next</span>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                      clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>





                    </div>


                </div>


            </main>
        </>
    )
};

export default Venue;
