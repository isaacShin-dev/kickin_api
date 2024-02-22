export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/account/profile' && localStorage.getItem('access_token') === null) {
        console.log('redirecting to login')
        return navigateTo('/account/login')
    }

})
