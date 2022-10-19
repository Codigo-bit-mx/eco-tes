import axios from 'axios'

const conexionTeslo = axios.create({
    baseURL: '/api'
})


export default conexionTeslo