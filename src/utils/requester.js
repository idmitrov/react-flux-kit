const baseUrl = 'http://localhost:5000';
const defaultOptions = {
    "mode": "cors",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    },
    "cache": "default"
};

let _request = (endpoint, options, type = "get") => {
    if (options.headers['content-type'] === 'application/json') {
        return window.fetch(`${baseUrl}${endpoint}`, options)
                .then(res => res.json());
    } else {
        return window.fetch(`${baseUrl}${endpoint}`, options);  
    }
}

const requester = {
    get: (endpoint, options = defaultOptions) => {
        return _request(endpoint, options);
    },
    post: (endpoint, payload, options = defaultOptions) => {
        options.method = "POST";
        options.body = JSON.stringify(payload);

        return _request(endpoint, options);
    }
};

export default requester;
