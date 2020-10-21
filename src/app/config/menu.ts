export class MenuConfig {

    public config: any = {};

    constructor() {
        this.config = {
            aside: {
                items: [
                    { section: 'Browse Music' },
                    {
                        title: 'Home',
                        icon: 'la la-home',
                        page: '/home'
                    },
                    {
                        title: 'Artists',
                        icon: 'la la-microphone',
                        page: '/artists'
                    },
                    {
                        title: 'Tracks',
                        icon: 'la la-music',
                        page: '/tracks'
                    },
                    {
                        title: 'Tags',
                        icon: 'la la-diamond',
                        page: '/tags'
                    },
                    {
                        title: 'Playlists',
                        icon: 'la la-play-circle',
                        page: '/playlists'
                    },
                    { section: 'Your Music' },
                    {
                        title: 'Favorites',
                        icon: 'la la-heart-o',
                        page: '/user/favorites'
                    },
                    {
                        title: 'Playlists',
                        icon: 'la la-list',
                        page: '/user/playlists'
                    },
                    {
                        title: 'History',
                        icon: 'la la-history',
                        page: '/user/history'
                    }
                ]
            },
            userMenu: {
                items: [
                    {
                        title: 'Profile',
                        icon: 'ion-md-contact',
                        page: '/user'
                    },
                    {
                        title: 'Settings',
                        icon: 'ion-md-settings',
                        page: '/settings'
                    }
                ]
            }
        };
    }
}
