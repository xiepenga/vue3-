console.log(11111111, axios)
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`
    return config
})
axios.interceptors.response.use(function (res) {
    console.log(res)
    const token = res.headers.authorization
    if (token) {
        localStorage.setItem('token', token)
    }
    return res.data
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token')
        location.href = '/login'
    }
})