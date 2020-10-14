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
                    // {
                    //     title: 'Artists',
                    //     icon: 'la la-microphone',
                    //     page: '/artists'
                    // },
                    // {
                    //     title: 'Stations',
                    //     icon: 'la la-bullseye',
                    //     page: '/stations'
                    // },
                    { section: 'Your Music' },
                    // {
                    //     title: 'Analytics',
                    //     icon: 'la la-bar-chart',
                    //     page: '/analytics'
                    // },
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
                    },
                    // { section: 'Music Events' },
                    // {
                    //     title: 'Events',
                    //     icon: 'la la-calendar',
                    //     page: '/events'
                    // },
                    // {
                    //     title: 'Add Event',
                    //     icon: 'la la-home',
                    //     page: '/add-event'
                    // },
                    // { section: 'Extra Pages' },
                    // {
                    //     title: 'Error',
                    //     icon: 'la la-times-circle-o',
                    //     page: '/404'
                    // }
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
