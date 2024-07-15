export function insertFile(file:any): Promise<any>{
    const formData = new FormData();
      formData.append('file', file);
   
      return $fetch('http://localhost:8000/api/v1/upload-file', {
              method: 'POST',
              body: formData,
             
            })
  }
  export function deleteFile(fileName: string): Promise<any> {
    return $fetch(`http:localhost:8000/api/v1/delete_file/${fileName}`, {
      method: 'DELETE',
    })
}