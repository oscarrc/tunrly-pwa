export class MenuConfig {

    public config: any = {};

    constructor() {
        this.config = {
            aside: {
                items: [
                    { section: 'menu.browsemusic' },
                    {
                        title: 'menu.home',
                        icon: 'la la-home',
                        page: '/home'
                    },
                    {
                        title: 'artists.name',
                        icon: 'la la-microphone',
                        page: '/artists'
                    },
                    {
                        title: 'tracks.name',
                        icon: 'la la-music',
                        page: '/tracks'
                    },
                    {
                        title: 'tags.name',
                        icon: 'la la-diamond',
                        page: '/tags'
                    },
                    {
                        title: 'playlists.name',
                        icon: 'la la-play-circle',
                        page: '/playlists'
                    },
                    { section: 'menu.yourmusic' },
                    {
                        title: 'menu.recommended',
                        icon: 'la la-fire',
                        page: '/user/recommended'
                    },
                    {
                        title: 'user.favorites.title',
                        icon: 'la la-heart-o',
                        page: '/user/favorites'
                    },
                    {
                        title: 'playlists.name',
                        icon: 'la la-list',
                        page: '/user/playlists'
                    },
                    {
                        title: 'user.history.title',
                        icon: 'la la-history',
                        page: '/user/history'
                    }
                ]
            },
            userMenu: {
                items: [
                    {
                        title: 'menu.profile',
                        icon: 'ion-md-contact',
                        page: '/user'
                    },
                    {
                        title: 'menu.settings',
                        icon: 'ion-md-settings',
                        page: '/settings'
                    }
                ]
            }
        };
    }
}
