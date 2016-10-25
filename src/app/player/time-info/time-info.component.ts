import { Component , Input, OnChanges, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'time-info',
    templateUrl: 'time-info.component.html',
    styleUrls:['time-info.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class TimeInfoComponent implements OnChanges{
    @Input() currentTime: number = 0;
    @Input() totalTime: number = 0;

    constructor() {}

    ngOnChanges(){

    }  
    timeFormat(num:number):string{
        //num:seconds
            if(num){
                let minutes:number = Math.floor(num/60);
                let seconds:number = Math.floor(num - minutes * 60); 
                let min = minutes < 10 ? '0'+ minutes : minutes;
                let sec = seconds < 10 ? '0'+ seconds : seconds;
                
                return `${min}:${sec}`;    
            }else{
                
                return "00:00";
            }
                 
    }
}
