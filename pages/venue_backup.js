import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/pages/navbar";

export async function getStaticProps() {
  try {
    const ListVenueResponse = await axios.post(process.env.apidomain+'/api/v1/venue/list',{});
    const ListVenue = ListVenueResponse.data.data;
    return { props: {  ListVenue } };
  } catch (error) {
    console.error(error);
    return { props: {  ListVenue: [] } };
  }
}
export default function Venue_backup({ListVenue}) {

  const router = useRouter();

  return (
      <>


<Navbar/>
        <main>



          <div className="grid grid-cols-8 gap-2">
            <div className="lg:col-start-3 lg:col-end-7 col-span-8  border-2 rounded-md border-neutral-900">
              <div className="relative">
                <Link href={`/add_venue`}>
                <button
                    className="mt-3 ml-4 bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                >
                 Tambah

                </button>
                </Link>




                <div className="mt-6 px-2 grid grid-cols-2 gap-y-10 gap-x-2 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-2">
                  {ListVenue.map((product) => (

                      <div
                          className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link key={product.id} href={`/product`}>
                          <div key={product.id} className=" group relative">
                            <div
                                className="  overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none ">

                              <div className="lg:h-64 h-40 w-96 relative">
                                {product.photos.map((ayam) => (
                                    <div key={ayam.id}>
                                      {ayam.sort === 2 ? (
                                          <Image
                                              src={process.env.pathimage + ayam.path_photo}
                                              alt={"image" + ayam.name}
                                              fill

                                          />
                                      ) : (
                                          <></>
                                      )}
                                    </div>
                                ))}
                                {/*<Image*/}
                                {/*    src={process.env.pathimage + product.path_thumb}*/}
                                {/*    alt={"image" + product.name}*/}
                                {/*    fill*/}

                                {/*/>*/}

                              </div>
                              <div
                                  className="absolute top-0 px-1 mt-2 rounded-tr-md rounded-br-md  bg-red-700 text-white  text-right ">
                                {product.category.name}
                              </div>
                            </div>

                            <div>
                              <h2 className=" font-bold text-gray-700">
                                {product.name}

                              </h2>
                              <p className="text-sm font-bold text-red-700">Rp. {product.price}</p>
                              <p className="mt-1 text-sm  text-gray-500">{product.city}</p>
                            </div>

                          </div>
                        </Link>
                      </div>

                  ))}
                </div>



              </div>
            </div>
          </div>

        </main>
        </>
  )
}