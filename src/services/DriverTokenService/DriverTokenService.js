const DriverTokenService = {
    hasToken(){
        return this.getToken();
    },
    getToken(){
        return window.localStorage.getItem("driver-token");
    },
    saveToken(token){
        return window.localStorage.setItem("driver-token", token);
    },
    updateToken(token){
        return this.saveToken(token);
    },
    deleteToken(){
        return window.localStorage.removeItem("driver-token");
    }
};

module.exports = DriverTokenService;