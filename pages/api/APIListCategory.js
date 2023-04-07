import axios from 'axios';

export default async (req, res) => {
    try {
        const response = await axios.get(process.env.apidomain+'/api/v1/category/list',{});
        const data = response.data.data;
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
