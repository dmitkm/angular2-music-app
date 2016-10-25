import { Component, Input, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { DraggableDirective } from '../../shared/draggable.directive';
import { PlayerService} from '../../shared/player.service';
import { Song } from '../../interface/song';

@Component({

    selector: 'control',
    templateUrl: 'controls.component.html',
    styleUrls: ['controls.component.scss'],
    providers:[DraggableDirective/*,PlayerService*/],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ControlsComponent implements OnChanges {
    @Input('playing') isPlaying :boolean; 
    @Input() song: Song;
    @Input() currentTime: number = 0; 
    @Input() totalTime: number = 0; 
    @Input() buffered: number = 0; 
   
    constructor(private PlayerService: PlayerService) {
        //this.isPlaying = false;


    }
    ngOnChanges(){
        //console.log(this.time.currentTime);
    }
    updatePos():any{
        if(!this.currentTime || typeof this.currentTime !== 'number' || this.currentTime == 0){
            return 0;
        }else{
            return this.toPercent(this.currentTime);
        }
    
    }
   
    timelineHandle(pos:number){
       let seekedTime = Math.floor((pos / 100 ) * this.totalTime); 
      // console.log(seekedTime,this.PlayerService);
       this.PlayerService.seek(seekedTime);
     
    }

    toggePlayPause(){
        //console.log(this.song); 
        if(this.song){
        this.PlayerService.togglePlayPause(this.song);
        }
    }

    prevSong(){

    }

    nextSong(){}


     private toPercent(pos:number):string{
        if (this.totalTime){
            return (pos/this.totalTime)*100 + "%";
        }
    }

}