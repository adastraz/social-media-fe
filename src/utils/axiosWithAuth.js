import axios from 'axios'

const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'https://social-media-clone1.herokuapp.com/',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export default axiosWithAuth