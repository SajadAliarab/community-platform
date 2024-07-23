import type { LoginModel, RegisterModel, UserModel } from "~/models/UserModel";

const apiUrl = 'https://api-community.sajad.uk'; 
// const apiUrl = 'http://localhost:8000'; 

// Function to register a new user
export function registerUser(registerModel: RegisterModel): Promise<any> {
    return fetch(`${apiUrl}/api/v1/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            userName: registerModel.userName,
            fName: registerModel.fName,
            lName: registerModel.lName,
            email: registerModel.email,
            password: registerModel.password,
        })
    });
}

// Function to log in a user
export function loginUser(loginModel: LoginModel, remember: boolean): Promise<any> {
    return fetch(`${apiUrl}/api/v1/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            email: loginModel.email,
            password: loginModel.password,
            remember: remember
        })
    });
}

// Function to check the token
export function checkToken(token: String): Promise<any> {
    return fetch(`${apiUrl}/api/v1/check-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            token: token
        })
    });
}

// Function to log out a user
export function logoutUser(token: String): Promise<any> {
    return fetch(`${apiUrl}/api/v1/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            token: token
        })
    });
}

// Function to get a user by ID
export function getUserById(id: Number): Promise<any> {
    return fetch(`${apiUrl}/api/v1/get-user-by-id/`+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },

    });
}

// Function to change a user's password
export async function changePasswordUser(id: Number, currentPassword: String, newPassword: String): Promise<any> {
    return fetch(`${apiUrl}/api/v1/change-password/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
        })
    }).then(response => response.json());
}

// Function to update a user
export async function updateUser(id: Number, data: UserModel): Promise<any> {
    return fetch(`${apiUrl}/api/v1/update-user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            userName: data.userName,
            fName: data.fName,
            lName: data.lName,
        })
    }).then(response => response.json());
}

// Function to delete a user by ID
export function deleteUserById(id: Number): Promise<any> {
    return fetch(`${apiUrl}/api/v1/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        }
    });
}
