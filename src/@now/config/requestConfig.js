import axios from 'axios';
// import firebaseService from 'app/services/firebaseService'
import firebase from 'firebase/app';

let prodConfig = {
    requestUrl: 'https://us-central1-now-test-76d4b.cloudfunctions.net/app' //url do functions pra desenvolvimento
};

const devConfig = {
    requestUrl: 'http://localhost:5000/now-test-76d4b/us-central1/app'   //url local para projeto produção
};

const requesctConfig = prodConfig 

axios.defaults.baseURL = requesctConfig.requestUrl
axios.defaults.timeout = 80000;
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(async config => {
    let authorization = ""

    if (firebase.auth().currentUser) {
        authorization = firebase.auth().currentUser.xa
    }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.headers['Authorization'] = config.headers['Authorization'] ? config.headers['Authorization'] : `Bearer ${authorization}`;

    return config
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 403) {
        // firebaseService.signOut();
    }

    return Promise.reject(error);
});

export default axios