import axios from 'axios'

const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'https://socialclone1.herokuapp.com/',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export default axiosWithAuth