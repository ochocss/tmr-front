export default class Task {
    constructor(id, typeId, subjectId, description, date, done) {
        this.id = id;
        this.typeId = typeId;
        this.subjectId = subjectId;
        this.description = description;
        this.date = date;
        this.done = done;
    }
}