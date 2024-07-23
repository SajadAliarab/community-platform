const apiUrl = 'https://api-community.sajad.uk'; 
// const apiUrl = 'http://localhost:8000'; 
export function insertFile(file: File): Promise<Response>{
    const formData: FormData = new FormData();
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