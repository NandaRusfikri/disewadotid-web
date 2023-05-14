
import Link from "next/link";
import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';

export async function getStaticProps() {
    try {


        const ListCategoryResponse =  await axios.get(process.env.apidomain+'/api/v1/category/list',{});
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
        price: 0,
        maps_rul: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // store the states in the form data
        const ReqFormData = new FormData();
        ReqFormData.append("name", formValue.name)
        ReqFormData.append("category_id", selectedCategory)
        ReqFormData.append("city", formValue.city)
        ReqFormData.append("address", formValue.address)
        ReqFormData.append("price", formValue.price)
        ReqFormData.append("maps_rul", formValue.maps_rul)
        for (let i = 0; i < fotos.length; i++) {
            if (fotos[i]) {
                ReqFormData.append(`thumbnail`, fotos[i]);
            }
        }
        // ReqFormData.append('thumbnail', fileInputs.current.files[0]);

        try {
            // make axios post request
            const response = await axios.post(process.env.apidomain+'/api/v1/venue', ReqFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            router.push('/[org_name]');
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
                                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                                                        autoComplete="given-name"
                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                                                        autoComplete="address-level2"
                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="price"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Harga / jam
                                                </label>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm  sm:max-w-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <span
                                                            className="flex select-none items-center pl-3 text-gray-900  sm:text-sm">Rp.</span>
                                                        <input
                                                            value={formValue.price}
                                                            onChange={handleChange}
                                                            type="number"
                                                            name="price"
                                                            id="price"
                                                            autoComplete="price"
                                                            className="px-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                            placeholder="45.000"
                                                        />
                                                    </div>
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
                                                        autoComplete="maps"
                                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                         rows={2}
                                                         className="px-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                                         defaultValue={''}
                                                     />
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
