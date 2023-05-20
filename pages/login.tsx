import {useRouter} from "next/router";
import {useState} from "react";
import {useLogin} from "../src/hooks/auth/useLogin";
import Navbar from "@/pages/navbar";
import Link from "next/link";
import Head from "next/head";

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
                .then((res) => router.push("/"))
                .catch((e) => alert(e));
        }
    };

    return (
        <>
            <Head>
                <title>Sign In disewa.id</title>
                <meta name="description" content="sewa lapangan olahraga gor venue "/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>



            <section className=" dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2"
                             src="disewa.id.svg" alt="logo"/>
                            Disewa.id
                    </Link>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account manager
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit} >
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        email</label>
                                    <input type="email" name="email" id="email"
                                           value={email}
                                           onChange={(e) => setName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input  value={password}
                                            onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox"
                                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-600 dark:ring-offset-gray-800"
                                                   />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember
                                                me</label>
                                        </div>
                                    </div>
                                    <a href="#"
                                       className="text-sm font-medium text-red-600 hover:underline dark:text-red-500">Forgot
                                        password?</a>
                                </div>
                                <button   type="submit"
                                        className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Sign
                                    in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link href="/register"
                                                                  className="font-medium text-red-600 hover:underline dark:text-red-500">Sign
                                    up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
