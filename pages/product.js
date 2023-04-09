import Image from "next/image";
import {Fragment, useState} from "react";
import Swipe from "react-easy-swipe";
import Head from 'next/head'
import Navbar from "@/pages/navbar";

export async function getStaticProps() {


    const images = ["https://lh3.googleusercontent.com/p/AF1QipN2gX9xg92zoCm602qwueofUH82DKt6Jm1erPS0=s1360-w1360-h1020",
        "https://lh3.googleusercontent.com/p/AF1QipNvjbkBjds4sNi9YYFvV5WKA_x_6gGSMQl1yh4L=s1360-w1360-h1020",
        "https://lh3.googleusercontent.com/p/AF1QipPsKWWxENuiOkOvPIp2FbeTO05aZ_mdZHmf-Pec=s1360-w1360-h1020"]
    return {
        props: {
            images,
        },
    }

}

export default function Product({images}) {
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
                                        className=" relative z-10 w-full h-full"
                                    >
                                        {images.map((image, index) => {
                                            if (index === currentSlide) {
                                                return (
                                                    <Image
                                                        key={image.id}
                                                        src={image}
                                                        fill
                                                        className="animate-fadeIn  "
                                                        alt={image}
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
                                    Everything you need to deploy your app
                                </p>
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Status Verified</h2>

                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget
                                    egestas a elementum
                                    pulvinar et feugiat blandit at. In mi viverra elit nunc.
                                </p>
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
                                            Jadwal
                                        </a>
                                    </li>
                                    <li className="grow  ">
                                        <a

                                            onClick={() => setOpenTab(2)}
                                            className={` ${openTab === 2 ? "active text-blue-600 font-bold border-b-2 border-blue-600" : ""} w-full text-black inline-block p-4 border-b-2 rounded-t-lg`}
                                        >
                                            Informasi
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

                                                            Court1
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black"
                                                        >

                                                            Court2
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black"
                                                        >

                                                            Court3
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black"
                                                        >

                                                            Court4
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-2 border-2 border-black"
                                                        >

                                                            Court5
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
                                                            <td scope="col"
                                                                className={person.email != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-orange-800 px-2 py-2 border-2 border-black"}>

                                                                {person.email}
                                                            </td>
                                                            <td scope="col"
                                                                className={person.role != '' ? "text-center px-2 py-2 border-2 border-black" : "bg-orange-800 px-2 py-2 border-2 border-black"}>

                                                                {person.role}
                                                            </td>


                                                        </tr>
                                                    ))}

                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={openTab === 2 ? "block" : "hidden"}>
                                        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                            <div className="px-4 py-5 sm:px-6">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900">Applicant
                                                    Information</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and
                                                    application.</p>
                                            </div>
                                            <div className="border-t border-gray-200">
                                                <dl>
                                                    <div
                                                        className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm text-left font-medium text-gray-500">Name</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot
                                                            Foster
                                                        </dd>
                                                    </div>
                                                    <div
                                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-left text-sm font-medium text-gray-500">Contact</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">WA
                                                            628xxxxxxxxx
                                                        </dd>
                                                    </div>

                                                    <div
                                                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-left text-sm font-medium text-gray-500">Lokasi</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <a href="#"
                                                               className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Google Maps
                                                            </a>
                                                        </dd>
                                                    </div>

                                                </dl>
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


