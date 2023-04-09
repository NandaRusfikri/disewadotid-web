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
        const ListVenueResponse = await axios.post(process.env.apidomain + '/api/v1/venue/list', {});
        const ListVenue = ListVenueResponse.data.data;

        const ListCategoryResponse = await axios.get(process.env.apidomain + '/api/v1/category/list', {});
        const ListCategory = ListCategoryResponse.data.data;

        return {props: {ListCategory, ListVenue}};
    } catch (error) {
        console.error(error);
        return {props: {ListCategory: [], ListVenue: []}};
    }
}

interface HomeProps {
    ListCategory: any[];
    ListVenue: any[];
    error: any;
}

const Home: React.FC<HomeProps> = ({ListCategory, ListVenue, error}) => {
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
                        <Link href={`/add_venue`}>
                            <button
                                className=" bg-secondary-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-5 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Tambah

                            </button>
                        </Link>
                        <div
                            className=" grid  gap-y-6 gap-x-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
                            {ListVenue.map((product) => (
                                <div
                                    className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                        <div key={product.id} className=" group relative">
                                            <div
                                                className="  overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none ">

                                                <div className="lg:h-64 h-48 w-96 relative">

                                                    {product.photos.map((ayam: any) => (
                                                        <div key={ayam.id}>
                                                            {ayam.sort === 1 ? (
                                                                <Image
                                                                    src={process.env.pathimage + ayam.path_photo}
                                                                    alt={"image" + product.name}
                                                                    fill

                                                                />
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    ))}


                                                </div>
                                                <div
                                                    className="absolute top-0 px-1 mt-2 rounded-tr-md rounded-br-md  bg-red-700 text-white  text-right ">
                                                    {product.category.name}
                                                </div>
                                            </div>

                                            <div className="px-2 py-2">
                                                <h2 className=" font-bold text-gray-700">
                                                    {product.name}

                                                </h2>
                                                <p className="text-sm font-bold text-red-700">Rp. {product.price}</p>

                                            </div>
                                            <div className="px-2 py-2 ">
                                                <div className="">
                                                    <button type="button"
                                                            className=" bottom-0 left-0  text-white bg-secondary-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-xs mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        <Link href="#">Updaye Jadwal</Link>
                                                    </button>
                                                    <button type="button"
                                                            className=" bottom-0 right-0  text-white bg-secondary-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-xs mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        <Link href="/manage_venue">Update Data</Link>
                                                    </button>
                                                </div>
                                            </div>



                                        </div>

                                </div>

                            ))}
                        </div>
                    </div>


                </div>


            </main>
        </>
    )
};

export default Home;
