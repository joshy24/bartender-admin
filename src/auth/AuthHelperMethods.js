import React from 'react'

import axios from 'axios';

import decode from 'jwt-decode'

const login_url = '/login'

export default class AuthHelperMethods{

    login = (username, password) => {
        return  this.axios(login_url, {username,password})
                    .then(res => {
                        this.setToken(res.data.token); 
                        return res;
                    })
                    .catch(err => {
                        console.log(err);
                        return "error";
                    })
    }

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    };

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired.
            return true;
            } else return false;
        } catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    };

    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    };

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("id_token");
    };

    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        let answer = decode(this.getToken());
        console.log("Recieved answer!");
        return answer;
    };
    
    axios = (url, data) => {
        // performs api calls sending the required authentication headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer:" + this.getToken();
        }

        return axios({
            url:url,
            method: "post",
            data: data, 
            baseURL: 'https://vast-wave-93458.herokuapp.com/admin',
            //baseURL: 'https://api.bartender247ng.com/admin',
            //baseURL: ' http://localhost:3777/admin',
            timeout: 30000,
            headers: headers
        })
        .then(this._checkStatus)
        .then(response => response)
        .catch(err => err)
    };

    _checkStatus = response => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            // Success status lies between 200 to 300
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

}