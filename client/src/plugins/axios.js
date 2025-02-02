import axios from 'axios'

export default {
    install: (app, baseURL) => {
        app.config.globalProperties.$axios = axios.create({
            baseURL: baseURL
        })
    }
}