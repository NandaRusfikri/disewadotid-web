import {useRouter} from "next/router";
import {useState} from "react";
import {useLogin} from "../src/hooks/auth/useLogin";
import Navbar from "@/pages/navbar";
import Link from "next/link";
import Head from "next/head";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Login() {
    const [email, setName] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useLogin();
    const router = useRouter();
    const onSubmit = (event: any) => {
        event.preventDefault()
        if (!email || !password) {
            alert("Please enter information");
        } else {
            login(email, password)
                .then((res) => router.push("/venue"))
                .catch((e) => alert(e));
        }
    };

    return (
        <>
            <Head>
                <title>Contact disewa.id</title>
                <meta name="description" content="sewa lapangan olahraga gor venue "/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>




            <section className=" dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact
                        Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Punya masalah teknis? Ingin mengirimkan umpan balik tentang fitur beta? Butuh detail tentang paket Bisnis kami? Beri tahu kami.</p>
                    <form action="#" className="space-y-8">
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
                                email</label>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </div>
                                <input type="text" id="input-group-1"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@gmail.com"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nomor Aktif</label>
                            <div className="flex">
                              <span
                                  className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                Whatsapp
                              </span>
                                <input type="number" id="phone"
                                       className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="628123456789"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input type="text" id="subject"
                                   className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:shadow-sm-light"
                                   placeholder="Beri tahu kami bagaimana kami dapat membantu Anda" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your
                                message</label>
                            <textarea id="message" rows={4}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                      placeholder="Tinggalkan komentar..."></textarea>
                        </div>
                        <button type="submit"
                                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Send
                            message
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
