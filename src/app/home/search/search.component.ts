import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject'
import { SearchService } from '../../shared/search.service';
import { Song } from '../../interface/song';
import { PlayerService } from '../../shared/player.service'
@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    providers:[SearchService,PlayerService]
})
export class SearchComponent {
    private stream = new Subject<string>();
    private result:Array<Song>=[];

    

    constructor(private _http: Http, private searchService: SearchService , private playerService: PlayerService) { }


    onChangeSearch(value: string) {
        this.stream.next(value);
    }

    play(song:Song){
        //console.log(this.playerService);
        this.playerService.play(song);
    }

    ngOnInit(){
        this.stream
            .debounceTime(400)
            .distinctUntilChanged()
            .flatMap(query => this.searchService.searchItem(query))
            .subscribe( res => {
                //console.log(res);
                this.result = res;
            });    
    }
}
