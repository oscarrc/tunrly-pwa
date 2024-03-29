import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';

import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { LayoutModule } from '../../layout/layout.module';
import { TagsComponent } from './tags/tags.component';
import { TagDetailsComponent } from './tags/tag-details/tag-details.component';
import { TagListComponent } from './tags/tag-list/tag-list.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artists/artist-details/artist-details.component';
import { TracksComponent } from './tracks/tracks.component';
import { TrackDetailsComponent } from './tracks/track-details/track-details.component';
import { PlaylistsComponent } from './playlists/playlists.compontent';
import { PlaylistDetailsComponent } from './playlists/playlist-details/playlist-details.component';
import { UserFavoritesComponent } from './user/favorites/favorites.component';
import { UserHistoryComponent } from './user/history/history.component';
import { UserProfileComponent } from './user/profile/profile.component';
import { UserRecommendedComponent } from './user/recommended/recommended.component';
import { UserComponent } from './user/user.component';
import { UserPlaylistsComponent } from './user/playlists/playlists.compontent';
import { EditPlaylistComponent } from './user/playlists/edit/edit-playlist.component';
import { UserSettingsComponent } from './user/settings/settings.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './albums/album-details/album-details.component';
import { AdminComponent } from './admin/admin.component';
import { TotalUserComponent } from './admin/total-user/total-user.component';
import { TotalSongsComponent } from './admin/total-songs/total-songs.component';
import { PurchasesComponent } from './admin/purchases/purchases.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { ReferralsComponent } from './admin/referrals/referrals.component';
import { SearchResultsComponent } from './search/search-results.component';

import { TrackService } from 'src/app/services/track.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { TagService } from 'src/app/services/tag.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { ValidationService } from 'src/app/services/validation.service';
import { ScrollService } from 'src/app/services/scroll.service';

import { AuthGuard } from '../../../core/guards/auth.guard';    

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const routes: Routes = [
    {
        path: '',
        component: ViewsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'tags',
                component: TagsComponent,
            },
            {
                path: 'tag/:name',
                component: TagDetailsComponent,
            },
            {
                path: 'tag/:name/:type',
                component: TagListComponent,
            },
            {
                path: 'artists',
                component: ArtistsComponent
            },
            {
                path: 'artist/:id/similar',
                component: ArtistsComponent
            },
            {
                path: 'artist/:id/albums',
                component: AlbumsComponent
            },
            {
                path: 'artist/:id/tracks',
                component: TracksComponent
            },
            {
                path: 'artist/:name',
                component: ArtistDetailsComponent,
            },
            {
                path: 'playlists',
                component: PlaylistsComponent
            },
            {
                path: 'playlist/:id',
                component: PlaylistDetailsComponent
            },
            {
                path: 'tracks',
                component: TracksComponent
            },
            {
                path: 'track/:id',
                component: TracksComponent
            },
            {
                path: 'track/:id/similar',
                component: TracksComponent
            },
            {
                path: 'track/:name/:artist',
                component: TrackDetailsComponent
            },
            {
                path: 'track/search',
                component: TrackDetailsComponent
            },
            {
                path: 'search/:type',
                component: SearchResultsComponent
            },
            {
                path: 'album/:name/:artist',
                component: AlbumDetailsComponent
            },          
            {
                path: 'admin',
                component: AdminComponent
            },
            {
                path: 'user',
                component: UserProfileComponent
            },
            {
                path: 'user/favorites',
                component: UserFavoritesComponent
            },
            {
                path: 'user/history',
                component: UserHistoryComponent
            },
            {
                path: 'user/playlists',
                component: UserPlaylistsComponent
            },
            
            {
                path: 'user/playlist',
                component: EditPlaylistComponent
            },
            {
                path: 'user/playlist/:id/edit',
                component: EditPlaylistComponent
            },
            {
                path: 'user/recommended',
                component: UserRecommendedComponent
            },        
            {
                path: 'user/:username/profile',
                component: UserComponent
            },
            {
                path: 'settings',
                component: UserSettingsComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        ViewsComponent,
        HomeComponent,
        TagsComponent,
        TagDetailsComponent,
        TagListComponent,
        ArtistsComponent,
        ArtistDetailsComponent,
        PlaylistsComponent,
        PlaylistDetailsComponent,
        TracksComponent,
        TrackDetailsComponent,
        UserFavoritesComponent,
        UserHistoryComponent,
        UserProfileComponent,
        UserRecommendedComponent,
        UserComponent,
        UserSettingsComponent,
        UserPlaylistsComponent,
        EditPlaylistComponent,
        AlbumsComponent,
        AlbumDetailsComponent,
        AdminComponent,
        TotalUserComponent,
        TotalSongsComponent,
        PurchasesComponent,
        StatisticsComponent,
        ReferralsComponent,
        SearchResultsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        PartialsModule,
        CoreModule,
        LayoutModule,
        ChartsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        PerfectScrollbarModule
    ],
    providers: [
        TrackService,
        ArtistService,
        AlbumService,
        PlaylistService,
        TagService,
        ValidationService,
        ScrollService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class ComponentsModule { }
