import { Component, OnInit} from '@angular/core';
import { ControlsComponent } from './controls/controls.component';
import { SongLabelComponent } from './song-label/song-label.component';
import { TimeInfoComponent } from './time-info/time-info.component';
import { VolumeComponent } from './volume/volume.component';
import { Song } from '../interface/song';
import { PlayerService } from '../shared/player.service';
import { SoundService } from '../shared/sound.service';


@Component({
    selector: 'player',
    templateUrl : 'player.component.html',
    styleUrls: ['player.component.scss']
    //,
    //providers:[PlayerService]
                

})
export class PlayerComponent implements OnInit{
    private audio:HTMLAudioElement;
    private song:Song;
    private isPlaying:boolean;
    private isMute:boolean;
    private totalTime:number = 0;
    private currentTime:number = 0;
    private buffered:number = 0;


    constructor(private PlayerService: PlayerService, private SoundService:SoundService) {
    
    }
    
     ngOnInit(){

        this.song =  null;
        this.isPlaying = false;
        this.isMute = false;


        this.SoundService.subscribe('timeupdate',(data) => {

            this.totalTime = data.duration;
            this.currentTime = data.currentTime;
            this.buffered = data.bufferedTime
            
        });


        this.SoundService.subscribe("play", (song) => {
            //console.log(song);
             this.song = song;
             this.isPlaying = true;
        });

        this.SoundService.subscribe("pause", () => {
            this.isPlaying = false;
            console.log("paused");
        });

        this.SoundService.subscribe("ended", () => {
            this.isPlaying = false;
        });

     }

}