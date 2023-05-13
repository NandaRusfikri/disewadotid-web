import Link from "next/link";
import React, {useRef, useState} from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosConfig';
import {useRouter} from 'next/router';
import Head from "next/head";
import Navbar from "../navbar";


const AddUser = ({}) => {

    const router = useRouter();


    const [formValue, setformValue] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // store the states in the form data


        var Request = {
            name: formValue.name,
            email: formValue.email,
            password: formValue.password,
        }

        console.log(Request)

        var Json = JSON.stringify(Request);


        try {
            // make axios post request
            const response = await axiosInstance.post('/api/v1/user/create', Json,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            router.push('/admin/users');
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }
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


                <div className="grid grid-cols-8 gap-2">
                    <div className="lg:col-start-3 lg:col-end-7 col-span-8  border-2 rounded-md border-neutral-900">
                        <div className="relative p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-12">

                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add New User</h2>


                                        <div className="mt-10 grid grid-cols-1 gap-x-6  sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Name User
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        value={formValue.name}
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder={'Gor Badminton Bintang 5'}
                                                        autoComplete="given-name"
                                                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>


                                            <div className="sm:col-span-3 ">
                                                <label htmlFor="city"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        value={formValue.email}
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        placeholder="email@gmail.com"
                                                        autoComplete="address-level2"
                                                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>


                                            <div className="sm:col-span-3">
                                                <label htmlFor="maps"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Password
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        value={formValue.password}
                                                        onChange={handleChange}
                                                        id="password"
                                                        name="password"
                                                        type="text"
                                                        placeholder={"Password1!"}
                                                        autoComplete="password"
                                                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>


                                        </div>


                                    </div>


                                </div>


                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        <Link href={`/admin/users`}>Cancel</Link>
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default AddUser;
