class TaskList {
    id: number;
    name: string;
    description: string;
    //created_at?: Date;
    //updated_at?: Date;

    constructor(id: number, name: string, description: string, created_at?: Date, updated_at?: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        //this.created_at = created_at;
        //this.updated_at = updated_at;
    }

    toJSON() {
        return {
            'id': this.id,
            'name': this.name,
            'description': this.description,
            //'created_at': this.created_at,
            //'updated_at': this.updated_at,
        }
    }
}

export {TaskList};