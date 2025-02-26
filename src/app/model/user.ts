export class User{
    userName: string = "";
    password: string = "";

    User(){
        this.userName = "";
        this.password = "";
    }
}

export interface IAPIRESPONSE{
    message: string;
    result: boolean;
    data: any;
}