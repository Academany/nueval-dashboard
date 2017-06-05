import Vue from 'vue'


export default {
    get(url, request) {
        // request = updateHeader(request);
        Vue.http.headers.common['X-Access-Token'] = localStorage.getItem('token')
        return Vue.http.get(url, request)
            .then((response) => Promise.resolve(response.body))
            .catch((error) => Promise.reject(error));
    },
    post(url, request) {
        // request = updateHeader(request);
        Vue.http.headers.common['X-Access-Token'] = localStorage.getItem('token')
        return Vue.http.post(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    put(url, request) {
        // request = updateHeader(request);
        Vue.http.headers.common['X-Access-Token'] = localStorage.getItem('token')
        return Vue.http.put(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    patch(url, request) {
        // request = updateHeader(request);
        Vue.http.headers.common['X-Access-Token'] = localStorage.getItem('token')
        return Vue.http.patch(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    delete(url, request) {
        // request = updateHeader(request);
        Vue.http.headers.common['X-Access-Token'] = localStorage.getItem('token')
        return Vue.http.delete(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    }
}
