import Link from "next/link";
import React, {useRef, useState} from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosConfig';
import {useRouter} from 'next/router';
import Head from "next/head";
import Navbar from "../navbar";
import Cookies from "js-cookie";

export async function getServerSideProps() {
    try {


        const ListRegionResponse = await axios.get(process.env.apidomain + '/api/v1/region/list', {});
        const ListRegion = ListRegionResponse.data.data;



        return {props: {ListRegion}};
    } catch (error) {
        console.error(error);
        return {props: {ListRegion: []}};
    }
}
const AddOrganization = ({ListRegion}) => {


    const router = useRouter();
    const [selectedProvince, setProvince] = useState()
    const [selectedCity, setCity] = useState()


    const [formValue, setformValue] = React.useState({
        name: '',
        email: '',
        phone: '',
        province: '',
        city: '',
        address: '',
        maps_url: '',
        description: '',
        user_id: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // store the states in the form data
        var currentUser =  JSON.parse(Cookies.get('currentUser'));

        var Request = {
            name: formValue.name,
            phone : formValue.phone,
            province: selectedProvince,
            city: selectedCity,
            address: formValue.address,
            email: formValue.email,
            maps_url: formValue.maps_url,
            user_id: currentUser.id,
            description: formValue.description,
        }

        console.log(Request)

        var Json = JSON.stringify(Request);


        try {
            // make axios post request
            const response = await axiosInstance.post('/api/v1/organization/create', Json,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            router.push('/admin/org');
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
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add New Organization</h2>


                                        <div className="mt-10 grid grid-cols-1 gap-x-6  sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Name
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

                                            <div className="sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Description
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        value={formValue.description}
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="description"
                                                        id="description"
                                                        placeholder={'Gor Badminton Bintang 5'}
                                                        autoComplete="given-name"
                                                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3 ">
                                                <label htmlFor="city"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        value={formValue.phone}
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="phone"
                                                        id="phone"
                                                        placeholder="628xxxxxxxx"
                                                        autoComplete="address-level2"
                                                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Maps URL
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        value={formValue.maps_url}
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="maps_url"
                                                        id="maps_url"
                                                        placeholder={'Gor Badminton Bintang 5'}
                                                        autoComplete="given-name"
                                                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Province
                                                </label>
                                                <div className="mt-2">
                                                    <select value={selectedProvince} onChange={(e) => {
                                                        setProvince(e.target.value);
                                                    }}
                                                            id="country"
                                                            name="country"
                                                            autoComplete="country-name"
                                                            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >

                                                        {ListRegion.map((province) => (
                                                            <option value={province.provinsi}>{province.provinsi}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            {selectedProvince && (
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="name"
                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <select value={selectedCity} onChange={(e) => {
                                                            setCity(e.target.value);
                                                        }}
                                                                id="country"
                                                                name="country"
                                                                autoComplete="country-name"
                                                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        >

                                                            {ListRegion.find((province) => province.provinsi === selectedProvince)?.kota.map((city) => (
                                                                <option key={city} value={city}>{city}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}







                                            <div className="sm:col-span-3">
                                                <label htmlFor="maps"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Address
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        value={formValue.address}
                                                        onChange={handleChange}
                                                        id="address"
                                                        rows={3}
                                                        name="address"
                                                        type="text"
                                                        placeholder={"alamat"}
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
export default AddOrganization;
