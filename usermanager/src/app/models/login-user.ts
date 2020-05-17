export class LoginUser {
    uid: number;
    first_name: string;
    last_name: string;
    email: string;
    admin_status: boolean;

    constructor(uid: number, first_name: string, last_name: string, email: string, admin_status: boolean) {
        this.uid = uid;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.admin_status = admin_status;
    }
}