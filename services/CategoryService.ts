const apiUrl =  'http://localhost:8000';
export function getCategories(): Promise<any> {
    return fetch(`${apiUrl}/api/v1/get-categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        
    })
}