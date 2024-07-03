import type { LoginModel, RegisterModel } from "~/models/UserModel";

export function registerUser(registerModel: RegisterModel): Promise<any> {
    return fetch('http://localhost:8000/api/v1/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: registerModel.userName,
            fName: registerModel.fName,
            lName: registerModel.lName,
            email: registerModel.email,
            password: registerModel.password,
        })

    })
}

export function loginUser(loginModel: LoginModel,remember:boolean): Promise<any> {
    return fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: loginModel.email,
            password: loginModel.password,
            remember:remember
        })

    })
}

export function checkToken(token:String): Promise<any> {
    return fetch('http://localhost:8000/api/v1/check-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })

    })
}

export function logoutUser(token:String): Promise<any> {
    return fetch('http://localhost:8000/api/v1/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })

    })
}

export function getUserById(id:Number): Promise<any> {
    return fetch('http://localhost:8000/api/v1/get-user-by-id/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    })
}