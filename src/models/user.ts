class User {
    id: number;
    email: string;
    created_at: Date;

    constructor(id: number, email: string, created_at: Date) {
        this.id = id;
        this.email = email;
        this.created_at = created_at;
    }
}