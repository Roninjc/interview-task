
const baseUrl = process.env.REACT_APP_API_URL;

export const fetchEvents = () => {

    const url = baseUrl;

    return fetch( url );

}