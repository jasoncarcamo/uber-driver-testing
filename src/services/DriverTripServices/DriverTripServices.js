const DriverTokenService = require("../DriverTokenService/DriverTokenService");

const DriverTripServices = {
    async findCloseTripByPositon(position){
        return fetch(`http://localhost:7000/api/trip/find/${position.last_known_lat}/${position.last_known_lng}`, {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            });   
    },
    async acceptNewtrip(id, updateTrip){
        return fetch(`http://localhost:7000/api/trip/confirmation/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            },
            body: JSON.stringify(updateTrip)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            });
    },
    async declineNewTrip(id, updateTrip){
        return fetch(`http://localhost:7000/api/trip/confirmation/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            },
            body: JSON.stringify(updateTrip)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            });
    }
};

module.exports = DriverTripServices;