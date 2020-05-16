export class UserGroup {
    id: number;
    first_name: string;
    last_name: string;
    group_name: string;

    constructor(id: number, first_name: string, last_name: string, group_name: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.group_name = group_name;
    }
}