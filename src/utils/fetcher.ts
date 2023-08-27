import axios from 'axios';

const fetcher = axios.create({});

export const fetcherGet = fetcher.get;
export const fetcherPost = fetcher.post;
export const fetcherDelete = fetcher.delete;
export const fetcherPut = fetcher.put;

export default fetcher;
