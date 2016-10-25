import { Component, Input, OnChanges,ChangeDetectionStrategy,SimpleChange} from '@angular/core';
import { Song } from '../../interface/song';

@Component({
   
    selector: 'song-label',
    templateUrl: 'song-label.component.html',
    styleUrls:['song-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongLabelComponent implements OnChanges{
    private label_url: string;
    private default_url: string = './img/svg/music-player.svg';
    @Input() song:Song;
   /* @Input() 
    set song(song: Song){
        if(this.song && this.song.imag_url){
            this.label_url = this.song.imag_url;
        }else{
            this.label_url = this.default_url;
        }
    };*/

    
   ngOnChanges(changes: {[propKey: string]: SimpleChange}){
       /*if(changes['song']){
           let currSong = changes['song'].currentValue;
           console.log(currSong);
       }*/
        if(this.song && this.song.imag_url){
            this.label_url = this.song.imag_url;
        }else{
            this.label_url = this.default_url;
        }
   }
    
}