export interface IUser {
    username: string;
    email: string;
    password: string;
}
export interface IUserLogin {
    email: string;
    password: string;
}
export interface IUserRegister {
    email:string;
    password:string;
    username:string;
}
export interface IUserCurrent {
    username:string;
    id:number;
    email:string;
}