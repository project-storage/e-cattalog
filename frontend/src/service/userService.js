import http from './http-common';

const userInfo = () => {
    const token = localStorage.getItem("token");
    if (token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return http.get("/api/user/info");
};

const userAll = ()=>{
    return http.get('/api/user/all')
}

const deleteUser = async (id) => {
    return http.delete(`/api/user/delete/${id.toString()}`)
}

const userService = {
    userInfo,
    userAll,
    deleteUser
}

export default userService;
