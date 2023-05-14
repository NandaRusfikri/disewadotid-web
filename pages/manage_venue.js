import Link from "next/link";
import React, {useRef, useState} from 'react';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import {useRouter} from 'next/router';
import Head from "next/head";
import Navbar from "./navbar";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
    try {


        const ListCategoryResponse = await axios.get(process.env.apidomain + '/api/v1/category/list', {});
        const ListCategory = ListCategoryResponse.data.data;

        return {props: {ListCategory}};
    } catch (error) {
        console.error(error);
        return {props: {ListCategory: []}};
    }
}

const AddVenue = ({ListCategory}) => {

    const router = useRouter();

    const [selectedCategory, setCategory] = useState()


    const fileInputs = useRef([]); // Ref untuk input file
    const [fotos, setFotos] = useState(Array(3).fill(null));
    const [previewFotos, setPreviewFotos] = useState(Array(3).fill(null));

    const handleFotosChange = (e, index) => {
        const selectedFoto = e.target.files[0];
        const updatedFotos = [...fotos];
        updatedFotos[index] = selectedFoto;
        setFotos(updatedFotos);

        // Membuat URL gambar preview untuk foto yang dipilih
        const reader = new FileReader();
        reader.onload = () => {
            const updatedPreviews = [...previewFotos];
            updatedPreviews[index] = reader.result;
            setPreviewFotos(updatedPreviews);
        };

        reader.readAsDataURL(selectedFoto);
    };

    const removeFotos = (index) => {
        // Menghapus gambar dari state fotos dan previewFotos berdasarkan index
        const updatedFotos = [...fotos];
        updatedFotos[index] = null;
        setFotos(updatedFotos);

        const updatedPreviews = [...previewFotos];
        updatedPreviews[index] = null;
        setPreviewFotos(updatedPreviews);

        // Menghapus nilai input file menggunakan useRef
        fileInputs.current[index].value = null;
    };

    const [formValue, setformValue] = React.useState({
        name: '',
        city: '',
        address: '',
        price: 60000,
        maps_rul: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // store the states in the form data
        // const ReqFormData = new FormData();
        // ReqFormData.append("name", formValue.name)
        // ReqFormData.append("category_id", selectedCategory)
        // ReqFormData.append("city", formValue.city)
        // ReqFormData.append("address", formValue.address)
        // ReqFormData.append("price", formValue.price)
        // ReqFormData.append("maps_rul", formValue.maps_rul)
        // for (let i = 0; i < fotos.length; i++) {
        //     if (fotos[i]) {
        //         ReqFormData.append(`thumbnail`, fotos[i]);
        //     }
        // }
        // // ReqFormData.append('thumbnail', fileInputs.current.files[0]);
        //
        // try {
        //     // make axios post request
        //     const response = await axiosInstance.put('/api/v1/[org_name]', ReqFormData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     router.push('/[org_name]');
        //     console.log(response)
        // } catch (error) {
        //     console.log(error)
        // }
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
                <div className={styles.center}>

                    <div className="mx-auto max-w-2xl py-8 px-2 sm:py-8 sm:px-6 lg:max-w-5xl lg:px-8">

                        <div className="mb-4 p-4   border-2 rounded-md border-neutral-900">
                            <div className="border-b border-gray-900/10 pb-2">
                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                        Slider Photo</h5>
                                    <a href="#"
                                       className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Tambah
                                    </a>
                                </div>

                                <div className="flex mt-2">
                                    {fotos.map((foto, index) => (
                                        <div key={index} className="flex-shrink-0 mr-4">
                                            <input
                                                type="file"
                                                onChange={(e) => handleFotosChange(e, index)}
                                                className="hidden"
                                                accept="image/*"
                                                ref={(input) => (fileInputs.current[index] = input)} // Menggunakan useRef untuk mengakses input file
                                                id={`foto-${index}`}
                                            />
                                            <label
                                                htmlFor={`foto-${index}`}
                                                className="block relative w-20 h-20 cursor-pointer border border-gray-300 rounded"
                                            >
                                                {previewFotos[index] ? (
                                                    <img
                                                        src={previewFotos[index]}
                                                        alt={`Foto Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span
                                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    Upload Foto
                                                </span>
                                                )}
                                            </label>
                                            {previewFotos[index] && (
                                                <button
                                                    className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
                                                    onClick={() => removeFotos(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className=" flex items-center justify-end gap-x-6">

                                <button
                                    type="submit"
                                    className="rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Change Photo
                                </button>
                            </div>
                        </div>

                        <div className="mb-4 p-4   border-2 rounded-md border-neutral-900">

                            <form onSubmit={handleSubmit}>

                                <div className="border-b border-gray-900/10 pb-2">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                            Venue Information
                                        </h5>

                                    </div>

                                    <div className="mt-2 grid grid-cols-1 gap-x-6  sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Name Venue
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


                                            <label htmlFor="country"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Category
                                            </label>
                                            <div className="mt-2">


                                                <select value={selectedCategory} onChange={(e) => {
                                                    setCategory(e.target.value);
                                                }}
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country-name"
                                                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option selected>Choose a Category</option>

                                                    {ListCategory.map((category) => (
                                                        <option value={category.id}>{category.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3 ">
                                            <label htmlFor="city"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Kota
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    value={formValue.city}
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    placeholder="Jakarta Selatan"
                                                    autoComplete="address-level2"
                                                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="price"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Harga / jam
                                            </label>


                                            <div className="mt-2 flex">
                                                          <span
                                                              className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                              Rp.
                                                          </span>

                                                <input value={formValue.price}
                                                       onChange={handleChange}
                                                       type="number"
                                                       name="price"
                                                       id="price"
                                                       className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       placeholder="60000"/>
                                            </div>


                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="maps"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Maps Url
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    value={formValue.maps_url}
                                                    onChange={handleChange}
                                                    id="maps"
                                                    name="maps"
                                                    type="maps"
                                                    placeholder={"https://maps.google.com/maps?q=loc:6.2359,106.7818"}
                                                    autoComplete="maps"
                                                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="address"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Alamat Lengkap
                                            </label>
                                            <div className="mt-2">
                                                     <textarea
                                                         value={formValue.address}
                                                         onChange={handleChange}
                                                         id="address"
                                                         name="address"
                                                         placeholder="Jl. Raya Ciputat No. 1, Ciputat, Tangerang Selatan, Banten 15412"
                                                         rows={2}
                                                         className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                         defaultValue={''}
                                                     />
                                            </div>
                                        </div>
                                    </div>


                                </div>


                                <div className=" flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        <Link href={`/venue`}>Cancel</Link>
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>


                        <div
                            className=" mb-4 p-4 border-2 rounded-md border-neutral-900  sm:p-8 ">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                    Daftar Lapangan</h5>
                                <a href="#"
                                   className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Tambah
                                </a>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Neil Sims
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                $320
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Bonnie Green
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                $3467
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Michael Gough
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                $67
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Lana Byrd
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                $367
                                            </div>
                                        </div>
                                    </li>
                                    <li className="pt-3 pb-0 sm:pt-4">
                                        <div className="flex items-center space-x-4">

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Thomes Lean
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                $2367
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>





                    </div>
                </div>
            </main>
        </>
    )
}
export default AddVenue;
