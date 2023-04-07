
import styles from '@/styles/Home.module.css'
import {useState} from "react";

import axios from 'axios';
import {number} from "prop-types";

export async function getStaticProps() {

    try {
        const ListVenueResponse = await axios.post(process.env.apidomain+'/api/v1/venue/list',{});
        const ListVenue = ListVenueResponse.data.data;

        const ListCategoryResponse =  await axios.get(process.env.apidomain+'/api/v1/category/list',{});
        const ListCategory = ListCategoryResponse.data.data;

        return {props: {ListCategory, ListVenue}};
    } catch (error) {
        console.error(error);
        return {props: {ListCategory: [], ListVenue: []}};
    }
}
interface HomeProps {
    ListCategory: any[];
    ListVenue: any[];
    error: any;
}
const Home: React.FC<HomeProps> = ({ ListCategory, ListVenue, error }) => {
    if (error) {
        return <div>An Error {error.message}</div>
    }
    // const [selectedCategory, setCategory] = useState()
    const [selectedCategory, setCategory] = useState<string | number>();


    return (
        <>

            <main >


                <div className={styles.center}>

                    <div className="mx-auto max-w-2xl  px-4lg:max-w-7xl lg:px-8">
                        <label htmlFor="countries"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                            Category</label>
                        <select value={selectedCategory} onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a Category</option>

                            {ListCategory.map((category) => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>


                </div>


            </main>
        </>
    )
};

export default Home;
