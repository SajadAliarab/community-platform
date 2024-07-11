import type { UserDetailModel } from "~/models/UserDetailModel"


export function getUserDetail(id:number): Promise<any> {
    return fetch('http://localhost:8000/api/v1/get-user-detail/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },


    }).then(response => response.json())
}
export async function updateUserDetail(id:number, data: UserDetailModel): Promise<any> {
    return fetch('http://localhost:8000/api/v1/update-user-detail/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: data.image,
            cover_image: data.cover_image,
            tagline: data.tagline,
            title: data.title,
            website: data.website,
            mobile: data.mobile,
            point: data.point
        }),
    }).then(response => response.json())
}