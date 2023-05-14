import Link from "next/link";
import React, {useRef, useState} from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosConfig';
import {useRouter} from 'next/router';
import Head from "next/head";
import Navbar from "../navbar";

export async function getServerSideProps() {
    try {


        const ListCategoryResponse = await axios.get(process.env.apidomain + '/api/v1/category/list', {});
        const ListCategory = ListCategoryResponse.data.data;

        const ListOrgResponse = await axios.post(process.env.apidomain + '/api/v1/organization/list', {});
        const ListOrg = ListOrgResponse.data.data;

        return {props: {ListCategory, ListOrg}};
    } catch (error) {
        console.error(error);
        return {props: {ListCategory: [],ListOrg: []}};
    }
}

const AddVenue = ({ListCategory,ListOrg}) => {

    const router = useRouter();

    const [selectedCategory, setCategory] = useState()
    const [selectedOrg, setOrg] = useState()


    const fileInputs = useRef([]); // Ref untuk input file
    const [fotos, setFotos] = useState(Array(5).fill(null));
    const [previewFotos, setPreviewFotos] = useState(Array(5).fill(null));

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

        price: 60000,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ReqFormData = new FormData();
        ReqFormData.append("category_id", selectedCategory)
        ReqFormData.append("org_id", selectedOrg)
        ReqFormData.append("price", formValue.price)
        for (let i = 0; i < fotos.length; i++) {
            if (fotos[i]) {
                ReqFormData.append(`photos`, fotos[i]);
            }
        }

        try {
            // make axios post request
            const response = await axiosInstance.post('/api/v1/venue', ReqFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            router.push('/admin/venue');
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
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Venue
                                            Information</h2>


                                        <div className="flex mb-4">
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


                                        <div className="mt-10 grid grid-cols-1 gap-x-6  sm:grid-cols-6">

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

                                            <div className="sm:col-span-3">


                                                <label htmlFor="country"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Organization
                                                </label>
                                                <div className="mt-2">


                                                    <select value={selectedOrg} onChange={(e) => {
                                                        setOrg(e.target.value);
                                                    }}
                                                            id="organization"
                                                            name="organization"
                                                            autoComplete="country-name"
                                                            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        <option selected>Choose a Organization</option>

                                                        {ListOrg.map((org) => (
                                                            <option value={org.id}>{org.name}</option>
                                                        ))}
                                                    </select>
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



                                        </div>


                                    </div>


                                </div>


                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        <Link href={`/venue`}>Cancel</Link>
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
export default AddVenue;
