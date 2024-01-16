export const useCommonStore = defineStore('common', () => {
    const theme = ref('light');
    const router = useRouter();

    const toggleTheme = (theme) => {
        console.log('toggleTheme', theme);
        theme.value = theme;
    };
    const route_to = (path) => {
        router.push(path);
    };

    return {
        theme,
        toggleTheme,
        route_to,
    };
});