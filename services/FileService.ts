const apiUrl = 'https://coapi.sajad.uk'; 
// const apiUrl = 'http://localhost:8000'; 
export function insertFile(file:any): Promise<any>{
    const formData = new FormData();
      formData.append('file', file);
   
      return $fetch(`${apiUrl}/api/v1/upload-file`, {
              method: 'POST',
              body: formData,
             
            })
  }
  export function deleteFile(fileName: string): Promise<any> {
    return $fetch(`${apiUrl}/api/v1/delete_file/${fileName}`, {
      method: 'DELETE',
    })
}