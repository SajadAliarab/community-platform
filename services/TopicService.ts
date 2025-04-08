const apiUrl = 'https://coapi.sajad.uk'; 
//const apiUrl =  'http://localhost:8000';

export function getTopicsByCategoryId(id:number): Promise<any> {
    return fetch(`${apiUrl}/api/v1/get-topics-by-category/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        
    })
}