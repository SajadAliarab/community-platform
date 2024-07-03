export interface RegisterModel {
    userName: string;
    fName: string;
    lName: string;
    email: string;
    password: string;
    confirmPassword: string;
    }
export interface LoginModel {
    email: string;
    password: string;
}    

export interface UserModel {
    userName: string;
    fName: string;
    lName: string | null;
    email: string;

}