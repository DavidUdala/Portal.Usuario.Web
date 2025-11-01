export class UserOutput {
    name : string;
    email : string;
    birthday : string;
    dateCreated : string;

    constructor(name : string, email : string, birthday : string, dateCreated : string){
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.dateCreated = dateCreated;
    }
}