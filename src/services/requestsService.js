const URL = "http://localhost:8080"

export default class RequestsService {

    static async get(endpoint) {
        let result;
        await fetch(URL + endpoint, {method: "GET"})
            .then(response => response.json())
            .then(data => result = data)
            .catch(err => console.error(err));
        return result;
    }

    static async post(endpoint, task) { //create
        let result;

        await fetch(URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: task.id,
                typeId: task.typeId,
                subjectId: task.subjectId,
                description: task.description,
                date: task.date
            })
        }).then(response => result = response);

        if(result) {
            return result.ok;
        }
    }

    static async put(endpoint, task) { //update
        let result;

        fetch(URL + endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: task.id,
                typeId: task.typeId,
                subjectId: task.subjectId,
                description: task.description,
                date: task.date
            })
        }).then(response => result = response);

        if(result) {
            return result.ok;
        }
    }

    static async delete(endpoint, id) {
        let result;
        
        await fetch(URL + endpoint + "/" + id, {method: "DELETE"}).then(response => result = response);

        if(result) {
            return result.ok;
        }
    }
}