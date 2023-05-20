import Image from "next/image";
import {Fragment, useState} from "react";
import Swipe from "react-easy-swipe";
import Head from 'next/head'
import Navbar from "@/pages/navbar";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import AddVenue from "../admin/add_venue";
import { FaWhatsapp } from "react-icons/fa";

import {
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'
export async function getServerSideProps({ params, req  }) {


    try {


        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers['x-forwarded-host'] || req.headers.host;
        const FullURL = `${protocol}://${host}${req.url}`;


        const ReqVenue = await axios.get(process.env.apidomain + '/api/v1/venue/'+params.id, );
        const DataVenue = ReqVenue.data.data;

        return {props: { DataVenue,FullURL}};
    } catch (error) {
        console.error(error);
        return {props: {DataVenue: {},FullURL:"https://disewa.id"}};
    }




}

const DetailVenue = ({DataVenue,FullURL}) => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [openTab, setOpenTab] = useState(1);

    const people = [
        {
            name: '08:00',
            title: 'Sepi',
            department: 'Sepi',
            role: '',
            email: 'Sepi',
            image: 'https://bit.ly/33HnjK0',
        },
        {
            name: '09:00',
            title: '',
            department: 'Sepi',
            role: '',
            email: '',
            image: 'Sepi',
        },
        {
            name: '10:00',
            title: '',
            department: '',
            role: ' Sepi',
            email: '',
            image: '',
        },
        {
            name: '11:00',
            title: 'Sepi',
            department: 'Sepi',
            role: '',
            email: 'Sepi',
            image: 'https://bit.ly/33HnjK0',
        },
        {
            name: '12:00',
            title: '',
            department: 'Sepi',
            role: '',
            email: '',
            image: 'Sepi',
        },
        {
            name: '13:00',
            title: '',
            department: '',
            role: ' Sepi',
            email: '',
            image: '',
        },
        {
            name: '14:00',
            title: 'Sepi',
            department: 'Sepi',
            role: '',
            email: 'Sepi',
            image: 'https://bit.ly/33HnjK0',
        },
        {
            name: '15:00',
            title: '',
            department: 'Sepi',
            role: '',
            email: '',
            image: 'Sepi',
        },
        {
            name: '16:00',
            title: '',
            department: '',
            role: ' Sepi',
            email: '',
            image: '',
        },
        {
            name: '17:00',
            title: 'Sepi',
            department: 'Sepi',
            role: '',
            email: 'Sepi',
            image: 'https://bit.ly/33HnjK0',
        },
        {
            name: '18:00',
            title: '',
            department: 'Sepi',
            role: '',
            email: '',
            image: 'Sepi',
        },
        {
            name: '19:00',
            title: '',
            department: '',
            role: ' Sepi',
            email: '',
            image: '',
        },
        {
            name: '20:00',
            title: 'Sepi',
            department: 'Sepi',
            role: '',
            email: 'Sepi',
            image: 'https://bit.ly/33HnjK0',
        },
        {
            name: '21:00',
            title: '',
            department: 'Sepi',
            role: '',
            email: '',
            image: 'Sepi',
        },
        {
            name: '22:00',
            title: '',
            department: '',
            role: ' Sepi',
            email: '',
            image: '',
        },
        {
            name: '23:00',
            title: '',
            department: '',
            role: ' Sepi',
            email: '',
            image: '',
        },
    ];
    // const fullUrl = currentUrl
    const handleCityClick = (mapsUrl) => {
        window.open(mapsUrl, "_blank");
    };

    const handleBookClick = (phone) => {
        window.open("https://wa.me/"+phone+"?text=saya ingin booking lapangan "+DataVenue.category.name+" untuk minggu depan. " +
            "apakah ada jadwal kosong?", "_blank");
    }

    const handleNextSlide = () => {
        let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const handlePrevSlide = () => {
        let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    const title = DataVenue.org?.name+" - "+DataVenue.category?.name;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={"Sewa Lapangan "+DataVenue.category?.name+" "+DataVenue.org?.city
                    +" "+DataVenue.org?.name}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <main>


                <div className="grid grid-cols-8 gap-2">
                    <div className="lg:col-start-3 lg:col-end-7 col-span-8  border-2 rounded-md border-neutral-900">



                        <div className="relative flex justify-center ">
                            <div className="lg:w-full w-full lg:h-[55vh] h-[35vh]">
                                <Swipe
                                    onSwipeLeft={handleNextSlide}
                                    onSwipeRight={handlePrevSlide}
                                    className="relative z-1 w-full h-full"
                                >
                                    {/* Kode gambar-gambar */}
                                    {DataVenue.photos?.map((image, index) => {
                                        if (index === currentSlide) {
                                            return (
                                                <Image
                                                    key={image.id}
                                                    src={process.env.pathimage + image.path_photo}
                                                    fill
                                                    className="animate-fadeIn"
                                                    alt={process.env.pathimage + image.path_photo}
                                                />
                                            );
                                        }
                                    })}

                                    {/* Bullets untuk navigasi */}
                                    <div className="absolute text-3xl bottom-2 left-1/2 -translate-x-1/2">
                                        <div className="relative flex justify-center p-2">
                                            {DataVenue.photos?.map((_, index) => {
                                                return (
                                                    <div
                                                        className={
                                                            index === currentSlide
                                                                ? "h-6 w-6 bg-black rounded-full mx-2 cursor-pointer border-2 border-black"
                                                                : "h-6 w-6 bg-gray-200 rounded-full mx-2 cursor-pointer border-2 border-stone-900"
                                                        }
                                                        key={index}
                                                        onClick={() => {
                                                            setCurrentSlide(index);
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Button WhatsappShare */}


                                </Swipe>

                            </div>

                        </div>




                        <div className="mx-auto max-w-7xl px-2 ">
                            <div className=" ">
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {DataVenue.org?.name}
                                </p>
                                <h2 className="text-xl  font-bold leading-7 text-red-600">Rp. {DataVenue.price.toLocaleString("id-ID")}/Jam</h2>
                                <h2 className="text-base  font-bold leading-7 ">Kategori Olahraga : <span className="text-indigo-600">{DataVenue.category?.name}</span></h2>

                                <h2 className="text-base  font-bold leading-7 ">Share  : </h2>
                                <div className=" bottom-1 right-2 z-10">
                                    <WhatsappShareButton url={FullURL} title={' '} separator=" ">
                                        <WhatsappIcon size={48} round />
                                    </WhatsappShareButton>
                                </div>

                            </div>
                        </div>

                        <hr className="border-gray-500 mt-4" />
                        <div>
                            <div
                                className="w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                                <ul className="flex ">
                                    <li className="grow  ">
                                        <a
                                            onClick={() => setOpenTab(1)}
                                            className={` ${openTab === 1 ? "active text-blue-600 font-bold border-b-2 border-blue-600" : ""} w-full text-black inline-block p-4 border-b-2  rounded-t-lg`}
                                        >
                                            Informasi
                                        </a>
                                    </li>
                                    <li className="grow  ">
                                        <a

                                            onClick={() => setOpenTab(2)}
                                            className={` ${openTab === 2 ? "active text-blue-600 font-bold border-b-2 border-blue-600" : ""} w-full text-black inline-block p-4 border-b-2 rounded-t-lg`}
                                        >
                                            Jadwal
                                        </a>
                                    </li>
                                    <li className="grow  ">
                                        <a

                                            onClick={() => setOpenTab(3)}
                                            className={` ${openTab === 3 ? "active text-blue-600 font-bold border-b-2 border-blue-600" : ""} w-full text-black inline-block p-4 border-b-2 rounded-t-lg`}


                                        >
                                            Feedback
                                        </a>
                                    </li>
                                </ul>
                                <div className="p-3 mt-2 bg-white ">
                                    <div className={openTab === 1 ? "block" : "hidden"}>


                                        <div>

                                            <div className=" border-t border-gray-100">
                                                <dl className="divide-y divide-gray-100">
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-bold  leading-6 text-gray-900">Domisili</dt>
                                                        <dd className="mt-1  text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{DataVenue.org?.province} - {DataVenue.org?.city}</dd>
                                                    </div>
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-bold leading-6 text-gray-900">Contact Booking</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">WA {DataVenue.org?.phone}</dd>
                                                    </div>
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-bold leading-6 text-gray-900">Email address</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{DataVenue.org?.email}</dd>
                                                    </div>
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-bold leading-6 text-gray-900">Alamat Lengkap</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            {DataVenue.org?.address}
                                                        </dd>

                                                        <button
                                                            className="text-black border border-black hover:bg-gray-200 dark:text-gray-100 dark:border-gray-100 hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center mr-2 mb-2"
                                                            onClick={() => handleCityClick(DataVenue.org?.maps_url)}
                                                        >
                                                            <svg
                                                                className="w-4 h-4 mr-2 -ml-1"
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                data-prefix="fas"
                                                                data-icon="map-marker-alt"
                                                                role="img"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 384 512"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M192 0C86 0 0 86 0 192c0 119.26 140.38 297.57 147.1 305.15a23.62 23.62 0 0 0 38.8 0C243.62 489.57 384 311.26 384 192 384 86 298 0 192 0zm0 352a96 96 0 1 1 96-96 96 96 0 0 1-96 96z"
                                                                ></path>
                                                            </svg>
                                                            Open in Maps
                                                        </button>


                                                    </div>
                                                    {/*<div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
                                                    {/*    <button type="button"*/}
                                                    {/*            onClick={() => handleBookClick(DataVenue.org.phone)}*/}
                                                    {/*            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-red-700 dark:focus:ring-red-400 mr-2 mb-2">*/}
                                                    {/*        Booking  Lapangan Sekarang*/}
                                                    {/*    </button>*/}
                                                    {/*</div>*/}

                                                </dl>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={openTab === 2 ? "block" : "hidden"}>

                                        Maaf Jadwal Belum Tersedia, ini hanya contoh tampilan
                                        <br/>
                                        <div className="grid  place-items-center">
                                            <div className="flex overflow-x-auto ">
                                                <table className=" divide-y divide-gray-200">
                                                    <thead className="flex-shrink-0  border-2 border-purple-300">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black "
                                                        >

                                                            Schedule
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black"
                                                        >

                                                            Lapangan 1
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black"
                                                        >

                                                            Lapangan 2
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black"
                                                        >

                                                            Lapangan 3
                                                        </th>


                                                    </tr>


                                                    </thead>
                                                    <tbody className="flex-shrink-0  border-2 border-purple-300">
                                                    {people.map((person) => (
                                                        <tr key={person.name}>

                                                            <td scope="col"
                                                                className=" px-2 py-2 border-2 border-black">
                                                                {person.name}
                                                            </td>
                                                            <td scope="col"
                                                                className={person.role != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-gray-300 px-2 py-2 border-2 border-black"}>
                                                                {person.role}
                                                            </td>
                                                            <td scope="col"
                                                                className={person.title != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-gray-300 px-2 py-2 border-2 border-black"}>

                                                                {person.title}
                                                            </td>
                                                            <td scope="col"
                                                                className={person.department != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-gray-300 px-2 py-2 border-2 border-black"}>

                                                                {person.department}
                                                            </td>



                                                        </tr>
                                                    ))}

                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={openTab === 3 ? "block" : "hidden"}>
                                        React JS with Tailwind CSS Tab 3 Content show

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className=" bottom-0 mt-100  left-0 w-full flex justify-center">
                            <button
                                type="button"
                                onClick={() => handleBookClick(DataVenue.org?.phone)}
                                className="mt-100  text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-green-700 dark:focus:ring-green-400 mr-2 mb-2"
                            >
                                <FaWhatsapp className="text-white mr-2" size={24} />
                                Chat / Booking Lapangan
                            </button>





                            {/*<button*/}
                            {/*    href="/"*/}
                            {/*    target="_blank"*/}
                            {/*    rel="noopener noreferrer"*/}
                            {/*    className="inline-flex items-center justify-center w-10 h-10 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"*/}
                            {/*>*/}
                            {/*    <FaWhatsapp className="text-white" size={24} />*/}
                            {/*</button>*/}

                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    className=" text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-red-700 dark:focus:ring-red-400 mr-2 mb-2"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-7 w-7 mr-2"*/}
                            {/*        fill="currentColor"*/}
                            {/*        viewBox="0 0 24 24">*/}
                            {/*        <path*/}
                            {/*            d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>*/}
                            {/*    </svg>*/}
                            {/*</button>*/}

                            {/*<button*/}
                            {/*    onClick={() => handleChatAdminClick()}*/}
                            {/*    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-green-500 sm:w-fit hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center"*/}
                            {/*>*/}
                            {/*   */}
                            {/*    Chat Admin disewa.id*/}
                            {/*</button>*/}
                        </div>

                    </div>

                </div>


            </main>


        </>
    )
}

export default DetailVenue;
