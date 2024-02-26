export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/en/account/profile' || to.path === '/kr/account/profile' && localStorage.getItem('access_token') === null) {
        console.log('redirecting to login')
        return navigateTo(localStorage.getItem('locale') === 'kr'?  '/kr/account/login' : '/en/account/login')
    }

})
