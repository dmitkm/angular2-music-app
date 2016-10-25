import { Injectable } from '@angular/core';
import { Song } from '../interface/song';
//import { PlaylistService } from './playlist.service';
import { SoundService } from './sound.service';


@Injectable()
export class PlayerService {
    
    private isPlaying:boolean;
    private isMute:boolean = false;
    private currentSong:Song = null;
    private instance:SoundService;
    constructor(/*private PlaylistService: PlayerService, */private SoundService: SoundService) {   

        this.SoundService.subscribe("play", (song) => {
            this.isPlaying = true;
            this.currentSong = song;
        }); 
        
        this.SoundService.subscribe("pause", () => {
            this.isPlaying = false;
            
        });

    }

    private getAudioInstance(){
        return this.SoundService;
    }
            
    play(song: Song){
        //console.log(song);
        this.currentSong = song;
        this.instance = this.getAudioInstance();

        this.instance.play(song);
        this.isPlaying = true;
    }

    seek(time: number){
        //console.log(this.instance);
        if(this.currentSong){
            this.SoundService.seek(time);
        }
    }
    togglePlayPause(song:Song){
        //if(this.instance.paused)[

        //]
        //this.SoundService.pause();
        //console.log(song);
        console.log(this.isPlaying);
           if(this.isPlaying){
                this.SoundService.pause();
                this.isPlaying = false;
            }else{
                console.log(song);
                console.log(this.currentSong);
                this.SoundService.play(song);
                //this.SoundService.play(song);
            } 
    }
    
    
    
}