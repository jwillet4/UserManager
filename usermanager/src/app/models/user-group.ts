export class UserGroup {
    uid: number;
    first_name: string;
    last_name: string;
    gid: number;
    group_name: string;

    constructor(uid: number, first_name: string, last_name: string, gid: number, group_name: string) {
        this.uid = uid;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gid = gid;
        this.group_name = group_name;
    }
}

export class UserGroupChangeDTO {
    uid: number;
    gid: number;

    constructor(uid: number, gid: number) {
        this.uid = uid;
        this.gid = gid;
    }
}