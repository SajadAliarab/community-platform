const apiUrl = 'https://coapi.sajad.uk'; 
//const apiUrl =  'http://localhost:8000';
export function getCategories(): Promise<any> {
    return fetch(`${apiUrl}/api/v1/get-active-categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        
    })
}
export function getCategoriesBySlug(slug:string): Promise<any> {
    return fetch(`${apiUrl}/api/v1/get-category-slug/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        
    })
}
    