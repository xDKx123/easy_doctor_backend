class TodoListItem {
    id: number;
    name: string;
    dueDate: Date;
    reminderDate: Date;
    status: string;
    created_at: Date;
    updated_at: Date;

    constructor(id: number, name: string, dueDate: Date, reminderDate: Date, status: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.reminderDate = reminderDate;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

}