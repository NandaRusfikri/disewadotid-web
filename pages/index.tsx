import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import {useState} from "react";
import {useRouter} from 'next/router'
import axios from 'axios';
import Image from 'next/image'
import Link from "next/link";
import Navbar from "@/pages/navbar";


export async function getStaticProps() {

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
                <title>Disewa.id</title>
                <meta name="description" content="sewa lapangan gor venue"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <main>


                <div className={styles.center}>

                    <div className="mx-auto max-w-2xl  px-4lg:max-w-7xl lg:px-8">
                        <label htmlFor="countries"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                            Category</label>
                        <select value={selectedCategory} onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a Category</option>

                            {ListCategory.map((category) => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <div className="mx-auto max-w-2xl py-8 px-2 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">


                            <div
                                className="mt-6 grid grid-cols-2 gap-y-6 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-3">
                                {ListVenue.map((product) => (
                                    <div
                                        className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                        <div key={product.id} className=" group relative">
                                            <div
                                                className="  overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none ">

                                                <div className="lg:h-64 h-40 w-96 relative">
                                                    <Image
                                                        src={process.env.pathimage + product.path_thumb}
                                                        alt={"image" + product.name}
                                                        fill
                                                        className="" // just an example
                                                    />
                                                    {/*<img*/}
                                                    {/*    src={process.env.pathimage+product.path_thumb}*/}
                                                    {/*    alt={product.imageAlt}*/}
                                                    {/*    className=" object-fill object-center object-contain "*/}
                                                    {/*/>*/}
                                                </div>
                                                <div
                                                    className="absolute top-0 px-1 mt-2 rounded-tr-md rounded-br-md  bg-red-700 text-white  text-right ">
                                                    {product.category.name}
                                                </div>
                                            </div>

                                            <div>
                                                <h2 className=" font-bold text-gray-700">
                                                    <Link href={`/product`}>{product.name}</Link>

                                                </h2>
                                                <p className="text-sm font-bold text-red-700">Rp. {product.price}</p>
                                                <p className="mt-1 text-sm  text-gray-500">{product.city}</p>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/*<Image*/}
                    {/*  className={styles.logo}*/}
                    {/*  src="/next.svg"*/}
                    {/*  alt="Next.js Logo"*/}
                    {/*  width={180}*/}
                    {/*  height={37}*/}
                    {/*  priority*/}
                    {/*/>*/}
                    {/*<div className={styles.thirteen}>*/}
                    {/*  <Image*/}
                    {/*    src="/thirteen.svg"*/}
                    {/*    alt="13"*/}
                    {/*    width={40}*/}
                    {/*    height={31}*/}
                    {/*    priority*/}
                    {/*  />*/}
                    {/*</div>*/}
                </div>


            </main>
        </>
    )
};

export default Home;
