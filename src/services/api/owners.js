import axios from 'axios';

const token = `Bearer ${process.env.REACT_APP_HUBSPOT_KEY}`;

export const getOwner = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_HUBSPOT_BASE_URL}/owners/${id}`);

    return response;
};

export const getOwners = async () => {
    const response = await axios.get(`${process.env.REACT_APP_HUBSPOT_BASE_URL}/owners`)

    return response;
};
