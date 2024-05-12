import axios from "axios";


const BASE_URL = "http://localhost:8080/api"
const TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoibW9oYXNzeSIsImV4cCI6MTY4MzY5MDE1OCwiaWF0IjoxNjgzNjg2NTU4LCJzY29wZSI6IlRSQURFUiJ9.TIX712c0dPPDvRp5PXaGxzMe7bb9EDVtTYmRIgKjAUY3rJc5LrM3fhvFdTbSwNnY1GNMQgCLp6uODti6NbBiPEUIgDEDF5RmcmlSNYUZ93QUMsB3XiMFJU0zWNERrHQoZtroc24Mkdh3UVTAZd_nkXA6EWYBEDH4BeZy0lzecmd8-ZTQxDWfYAcWALjWc33eAvpeiJ-WwH9yfKVPINqYAg91K-5y_DPE13VTCZr-e6LiilWEnTcoTlcVhErgtxvwf2qkCrl5iZNML6aRgrix9i4_1_xee7GzX-fQLzfMwMY_gqIPo-AQobeb7iR82RUhocaqQWahyv3EBXiUWL1ssw"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
});