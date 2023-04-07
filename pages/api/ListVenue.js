import axios from 'axios';

export default async (req, res) => {
    try {
        const response = await axios.post(process.env.apidomain+'/api/v1/venue/list',{});
        const data = response.data.data;
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
