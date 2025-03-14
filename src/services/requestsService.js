const URL = "http://localhost:8080"

class RequestsService {
    constructor(endpoint) {
        this.endpoint = endpoint
    }

    async get() {
        let result;
        await fetch(URL + this.endpoint, {method: "GET"})
            .then(response => response.json())
            .then(data => result = data)
            .catch(err => console.error(err));
        return result;
    }

    async post() {
        fetch(URL + this.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify({
                name: "a"
            })
        })
    }

    async update() {

    }

    async delete(id) {
        let result; // TODO
        await fetch(URL + this.endpoint, {method: "DELETE"})
            .then(response => response.json())
            .then(data => result = data)
            .catch(err => console.error(err));
        return result;
    }
}

export default RequestsService;