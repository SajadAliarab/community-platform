import type { LoginModel, RegisterModel, UserModel } from "~/models/UserModel";

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
export async function  changePasswordUser(id:Number,currentPassword:String,newPassword:String): Promise<any> {
    return fetch('http://localhost:8000/api/v1/change-password/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
        })
    }).then(response => response.json())
}
export async function updateUser(id:Number,data:UserModel): Promise<any> {
    return fetch('http://localhost:8000/api/v1/update-user/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: data.userName,
            fName: data.fName,
            lName: data.lName,
        })
    }).then(response => response.json())
}
