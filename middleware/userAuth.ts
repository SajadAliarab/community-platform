export default defineNuxtRouteMiddleware(to => {
    // skip middleware on server
    if (import.meta.server) return
    // skip middleware on client side entirely
    if (import.meta.client){
        if(to.path.startsWith('/dashboard')){
   
    
            const token:any=localStorage.getItem('token');
            if(!token){
                return navigateTo('/login');
            }
        }
    }
    
    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
  })