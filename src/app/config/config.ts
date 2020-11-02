export class Config {

    static CURRENT_USER = 'currentUser';
    static THEME_CLASSES = ['primary', 'danger', 'success', 'warning', 'info', 'brand', 'dark'];
    static THEME_SKIN = 'themeSkin';

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
                logo: './assets/images/logos/logo.svg',
                name: 'Tunrly.com'
            },
            themeSkin: {
                theme: 'dark',
                header: 0,
                sidebar: 0,
                player: 0
            }
        };
    }
}
