import http from './http-common';

const login = (loginData) => {
    return http.post('/api/auth/login', loginData)
}

const register = (registerData) => {
    return http.post('/api/auth/register', registerData)
}

const registerAdmin = (userData) => {
    return http.post('/api/auth/register/admin', registerData)
}

const authService = {
    login,
    register,
    registerAdmin
}

export default authService