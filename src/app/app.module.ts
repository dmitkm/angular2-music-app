
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.compotent';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './home/search/search.component';

import { routing } from './app.routing';

//players components
import { PlayerComponent } from './player/player.component';
import { ControlsComponent } from './player/controls/controls.component';
import { SongLabelComponent } from './player/song-label/song-label.component';
import { TimeInfoComponent } from './player/time-info/time-info.component';
import { VolumeComponent } from './player/volume/volume.component';

//services
import {PlayerService} from './shared/player.service';
import { SoundService } from './shared/sound.service';
import { SearchService } from './shared/search.service';
//import { PlaylistService } from './shared/playlist.service';
import { DraggableDirective } from './shared/draggable.directive';

@NgModule({
    imports:[
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations:[
        AppComponent,
        HomeComponent,
        AboutComponent,
        SearchComponent,
        PlayerComponent,
        ControlsComponent,
        TimeInfoComponent,
        SongLabelComponent,
        VolumeComponent,
        DraggableDirective
        ],
    providers:[ 
        SearchService,
        SoundService,
        PlayerService
    ],
    bootstrap:[AppComponent] 
})
export class AppModule {}