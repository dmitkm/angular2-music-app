import { Injectable } from '@angular/core';
import { Song } from '../interface/song';

@Injectable()
export class SoundService {
    private audio:any;
    private currentSong:Song;
    private listners: Array<Array<any>>=[];

    constructor() {
        this.audio = new Audio();
        
        this.audio.addEventListener("play", this.getCurrentSong.bind(this), false);
        this.audio.addEventListener("pause",/*this.publish("pause", null)*/ this.pauseHandler.bind(this), false);
        this.audio.addEventListener("timeupdate", this.timeUpdate.bind(this), false);
        this.audio.addEventListener("ended", this.publish("ended", null), false);
        this.audio.addEventListener("volumechange", this.publish("volumechange", null), false);
        this.audio.addEventListener("error", this.publish("error", null), false);
     }


    private timeUpdate(event){
        //console.log(event.type, event.target.buffered,
        //event.target.buffered.end(0), 
        //event.target.currentTime, event.target.duration);
        let interval = event.target.buffered.length ? event.target.buffered.end(0): 0;
        let timeData = {
            bufferedTime:interval,
            currentTime: event.target.currentTime,
            duration: event.target.duration
        };
    
       this.publish("timeupdate", timeData);
    }
    
   private pauseHandler(event){
       console.log(event.type);
       this.publish("pause",null);
   }
    private getCurrentSong() {
        if(this.currentSong){
            this.publish("play", this.currentSong);
        }
    }

    play(song:Song){ 
        if(this.currentSong != song){
            this.audio.src = song.stream_url;
            this.currentSong = song; 
        }else{
            //this.audio.play();
        }   
        this.audio.play();
        
    }

    pause(){
        this.audio.pause();
    }

    resume(){
        this.audio.resume();   
    }

    seek(time:number){
        if(time){
            this.audio.currentTime = time;
        }
    }

    setVolume(volume: number){
        this.audio.volume = volume;
    }
    publish(listner:string, data:any):boolean{
        if(!this.listners[listner]) return false;

        let len = this.listners[listner].length;    

        while(len--){
            this.listners[listner].forEach((item)=>{
                item.func(data);
            });
        }
        return true;
        
    }
    subscribe(listner:string, handler:any){
        if(!this.listners[listner]){
            this.listners[listner]=[];
        }

        this.listners[listner].push({
            name: listner,
            func: handler   
        });
    }


}