import { Injectable , OnInit} from '@angular/core';
import { localStorage } from './localstorage';
import { Song } from '../interface/song';

@Injectable()
export class PlaylistService implements OnInit {
    private currentSong:Song;
    private playlist: Array<Song>;
    constructor() { }

    ngOnInit(){
        this.currentSong = null;
        this.playlist = localStorage.getItem('data_playlist');
        if(!this.playlist){
            this.playlist = [];
        }
    }
    
    play(song:Song){
        this.playlist.push(song);
    }
    
    next():Song{

        let song;
        return song;
    }

    prev():Song{  

        let song;  
        return song;
    }


}