export { fetchImages }
import axios from "axios";


async function fetchImages(searchName,page) {
    const API_KEY = '31642962-139425cc99637104e380eec6c';
    const BASE_URL = 'https://pixabay.com/api/';
    axios.defaults.baseURL = `${BASE_URL}`;


    const response= await axios.get(
    `?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
  
    return response.data;








}