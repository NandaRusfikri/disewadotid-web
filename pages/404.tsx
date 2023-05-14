import Link from 'next/link';

function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Page not found</h1>
            <Link href={"/"} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                Go back to home
            </Link>
        </div>
    );
}

export default Custom404;
