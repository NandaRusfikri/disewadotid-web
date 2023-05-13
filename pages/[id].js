import Image from "next/image";
import {Fragment, useState} from "react";
import Swipe from "react-easy-swipe";
import Head from 'next/head'
import Navbar from "@/pages/navbar";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import AddVenue from "./admin/add_venue";



export async function getServerSideProps({ params }) {

    try {

        //
        const ReqVenue = await axios.get(process.env.apidomain + '/api/v1/venue/'+params.id, );
        const DataVenue = ReqVenue.data.data;


        const images = ["https://lh3.googleusercontent.com/p/AF1QipN2gX9xg92zoCm602qwueofUH82DKt6Jm1erPS0=s1360-w1360-h1020",
            "https://lh3.googleusercontent.com/p/AF1QipNvjbkBjds4sNi9YYFvV5WKA_x_6gGSMQl1yh4L=s1360-w1360-h1020",
            "https://lh3.googleusercontent.com/p/AF1QipPsKWWxENuiOkOvPIp2FbeTO05aZ_mdZHmf-Pec=s1360-w1360-h1020"]
        return {props: {images, DataVenue}};
    } catch (error) {
        console.error(error);
        return {props: {images: [],DataVenue: {}}};
    }




}

const DetailVenue = ({images,DataVenue}) => {

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

    const handleCityClick = (mapsUrl) => {
        window.open(mapsUrl, "_blank");
    };

    const handleBookClick = (phone) => {
        window.open("https://wa.me/"+phone+"?text=saya ingin booking lapangan ", "_blank");
    }

    const handleNextSlide = () => {
        let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const handlePrevSlide = () => {
        let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };
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
                        <div className="relative">


                            <div className="relative flex justify-center ">
                                <div className=" lg:w-full  w-full lg:h-[55vh] h-[35vh] ">
                                    <Swipe
                                        onSwipeLeft={handleNextSlide}
                                        onSwipeRight={handlePrevSlide}
                                        className=" relative z-1 w-full h-full"
                                    >
                                        {DataVenue.photos.map((image, index) => {
                                            if (index === currentSlide) {
                                                return (
                                                    <Image
                                                        key={image.id}
                                                        src={process.env.pathimage + image.path_photo}
                                                        fill
                                                        className="animate-fadeIn  "
                                                        alt={process.env.pathimage + image.path_photo}
                                                    />
                                                );
                                            }
                                        })}

                                        <div className="absolute text-3xl  bottom-2 left-1/2 -translate-x-1/2">
                                            <div className="relative flex justify-center p-2">
                                                {images.map((_, index) => {
                                                    return (
                                                        <div
                                                            className={
                                                                index === currentSlide
                                                                    ? "h-4 w-4 bg-black rounded-full mx-2 mb-2 cursor-pointer border-2 border-black"
                                                                    : "h-4 w-4 bg-gray-200 rounded-full mx-2 mb-2 cursor-pointer border-2 border-stone-900"
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


                                    </Swipe>


                                </div>


                            </div>


                        </div>
                        <div className="mx-auto max-w-7xl px-2 ">
                            <div className=" ">
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {DataVenue.org.name}
                                </p>
                                <h2 className="text-xl  font-bold leading-7 text-red-600">Rp. {DataVenue.price}/Jam</h2>
                                <h2 className="text-base  font-bold leading-7 ">Category Olahraga : <span className="text-indigo-600">{DataVenue.category.name}</span></h2>

                                <h2 className="text-base  font-bold leading-7 ">Status : <span className="text-indigo-600">{DataVenue.status}</span></h2>


                                {/*<p className="mt-6 text-lg leading-8 text-gray-600">*/}
                                {/*    Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget*/}
                                {/*    egestas a elementum*/}
                                {/*    pulvinar et feugiat blandit at. In mi viverra elit nunc.*/}
                                {/*</p>*/}
                            </div>
                        </div>


                        <div>
                            <div
                                className="w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                                <ul className="flex ">
                                    <li class="grow  ">
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
                                                        <dd className="mt-1  text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{DataVenue.org.province} - {DataVenue.org.city}</dd>
                                                    </div>
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-bold leading-6 text-gray-900">Contact Booking</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">WA {DataVenue.org.phone}</dd>
                                                    </div>
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-bold leading-6 text-gray-900">Email address</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{DataVenue.org.email}</dd>
                                                    </div>
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-bold leading-6 text-gray-900">Alamat Lengkap</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            {DataVenue.org.address}
                                                        </dd>

                                                        <button
                                                            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                                                            onClick={() => handleCityClick(DataVenue.org.maps_url)}
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
                                                    <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <button type="button"
                                                                onClick={() => handleBookClick(DataVenue.org.phone)}
                                                                className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2">
                                                            Booking  Lapangan Sekarang

                                                        </button>
                                                    </div>

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
                                                        <tr key={person.email}>

                                                            <td scope="col"
                                                                className=" px-2 py-2 border-2 border-black">
                                                                {person.name}
                                                            </td>
                                                            <td scope="col"
                                                                className={person.role != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-orange-800 px-2 py-2 border-2 border-black"}>
                                                                {person.role}
                                                            </td>
                                                            <td scope="col"
                                                                className={person.title != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-orange-800 px-2 py-2 border-2 border-black"}>

                                                                {person.title}
                                                            </td>
                                                            <td scope="col"
                                                                className={person.department != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-orange-800 px-2 py-2 border-2 border-black"}>

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


                    </div>

                </div>


            </main>


        </>
    )
}

export default DetailVenue;
