class Task {
    id: number;
    name: string;
    description: string;
    deadline: string;
    completed: boolean;
    task_list_fk: number;

    constructor(id: number, name: string, deadline: string, completed: boolean, description: string, task_list_fk: number) {
        this.id = id;
        this.name = name;
        this.description = description
        this.deadline = deadline;
        this.completed = completed;
        this.task_list_fk = task_list_fk;
    }

    toJSON() {
        return {
            'id': this.id,
            'name': this.name,
            'description': this.description,
            'deadline': this.deadline,
            'completed': this.completed,
            'task_list_fk': this.task_list_fk
        };
    }
}

export {Task};