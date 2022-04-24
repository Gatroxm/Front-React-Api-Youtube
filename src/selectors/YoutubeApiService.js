import axios from "axios";

export const getAllVideoYoutubeSearches = (query) => {
    if (query === '') {
        throw new Error('Invalid query');
    }
    return axios.get(`http://localhost:8080/api/youtube/${query}`);

}