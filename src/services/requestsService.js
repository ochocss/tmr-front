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

    async post(task) { //create
        fetch(URL + this.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify({
                id: task.id,
                typeId: task.typeId,
                subjectId: task.subjectId,
                desc: task.desc,
                date: task.date
            })
        })
    }

    async put(task) { //update
        fetch(URL + this.endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify({
                id: task.id,
                typeId: task.typeId,
                subjectId: task.subjectId,
                desc: task.desc,
                date: task.date
            })
        })
    }

    async delete(id) {
        await fetch(URL + this.endpoint + "/" + id, {method: "DELETE"});
    }
}

export default RequestsService;