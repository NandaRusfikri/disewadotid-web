import {useRouter} from "next/router";
import {useState} from "react";
import {useLogin} from "../src/hooks/auth/useLogin";
import Navbar from "@/pages/navbar";

import Head from "next/head";


const Contact = () => {


    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


    const handleChatAdminClick = () => {
        const phone = "6282312664564";
        window.open("https://wa.me/"+phone+"?text="+subject+"%2C%0A%0A%0A" +
            message, "_blank","noopener noreferrer");
    }

    return (
        <>
            <Head>
                <title>Contact Admin disewa.id</title>
                <meta name="description" content="Kirim Saran/Kritik ke admin "/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>




            <section className=" dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact
                        Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Punya masalah teknis? Ingin memberi kritik/saran ? Ingin menambahkan Venue ? Beri tahu kami.</p>
                    <form action="#" className="space-y-8">
                        {/*<div>*/}
                        {/*    <label htmlFor="email"*/}
                        {/*           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your*/}
                        {/*        email</label>*/}
                        {/*    <div className="relative mb-6">*/}
                        {/*        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">*/}
                        {/*            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"*/}
                        {/*                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>*/}
                        {/*                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>*/}
                        {/*            </svg>*/}
                        {/*        </div>*/}
                        {/*        <input type="text" id="input-group-1"*/}
                        {/*               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                        {/*               placeholder="name@gmail.com"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <label htmlFor="phone"*/}
                        {/*           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nomor Aktif</label>*/}
                        {/*    <div className="flex">*/}
                        {/*      <span*/}
                        {/*          className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">*/}
                        {/*        Whatsapp*/}
                        {/*      </span>*/}
                        {/*        <input type="number" id="phone"*/}
                        {/*               className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                        {/*               placeholder="628123456789"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div>
                            <label htmlFor="subject"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input value={subject}
                                   onChange={(e) => setSubject(e.target.value)} type="text" id="subject"
                                   className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:shadow-sm-light"
                                   placeholder="Beri tahu kami bagaimana kami dapat membantu Anda" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your
                                message</label>
                            <textarea value={message}
                                      onChange={(e) => setMessage(e.target.value)} id="message" rows={4}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                      placeholder="Tinggalkan komentar..."></textarea>
                        </div>
                        <button
                                onClick={() => handleChatAdminClick()}
                                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-green-500 sm:w-fit hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                            </svg>
                            Chat Admin disewa.id
                        </button>

                    </form>
                </div>
            </section>
        </>
    );
}
export default Contact

