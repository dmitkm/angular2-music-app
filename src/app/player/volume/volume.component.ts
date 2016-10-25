import { Component, Input } from '@angular/core';
import { SoundService } from '../../shared/sound.service';

@Component({
   
    selector: 'volume',
    templateUrl: 'volume.component.html',
    styleUrls:['volume.component.scss']
})
export class VolumeComponent {
    @Input() muted:boolean;
    //@Output() seekVolume = 
   
    constructor(private SoundService: SoundService){

    }
    volumeHandler(pos:number){
        let volume = (pos/100 * 1).toFixed(1);
        this.SoundService.setVolume(Number(volume));
    }
}