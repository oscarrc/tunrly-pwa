export class Config {

    static CURRENT_USER = 'user';
    static THEME_CLASSES = ['primary', 'danger', 'success', 'warning', 'info', 'brand', 'dark'];
    static THEME_SKIN = 'skin';
    static APP_LANG = 'lang';

    static classes = {
        show: 'show',
        openSearch: 'open-search',
        openSidebar: 'open-sidebar',
        iconicSidebar: 'iconic-sidebar'
    };

    public config: any = {};

    constructor() {
        this.config = {
            brand: {
                logo: './assets/images/logo.svg',
                name: 'Tunrly.com'
            },
            themeSkin: {
                theme: 'dark',
                header: 0,
                sidebar: 0,
                player: 0
            },
            isOpen: false,
            kofi: 'https://ko-fi.com/oscarrc'
        };
    }
}
