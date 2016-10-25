import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Song } from '../interface/song';
import { API_BASE_URL, API_TRACK_URL , API_CLIENT_ID, PAGINATE_PARAM } from '../app_config';
@Injectable()
export class SearchService {

    public API_BASE_URL = API_BASE_URL;
    public API_TRACK_URL = `http://api.soundcloud.com/track`;

    ///tracks?limit=50&linked_partitioning=1&client_id=';

    private API_CLIENT_ID = '5425e4d81a576ca003cc55795a98217f';
    //gold_dust&offset=0&limit=2&type=track';

    constructor(private _http: Http) { 
        this.API_BASE_URL = 'http://api.soundcloud.com';
        this.API_TRACK_URL = `${this.API_BASE_URL}/tracks`;
    }

    searchItem(query:string):Observable<any>{

        return this.request({
            url:this.API_TRACK_URL,
            query:`q=${query}`, 
            paginate:true 
        })
        .map(res => {
           let data = res.json();
           let collection:Array<Song>=[];
           if(data.collection){
               data.collection.forEach( item => {
                
                let song:Song=<Song>{};
                    song.id = item.id;
                    song.artist = item.user.username;
                    song.duration = item.duration/1000;
                    song.genre = item.genre;
                    song.name = item.title;
                    song.imag_url = item.artwork_url;
                    song.stream_url = item.stream_url+`?${API_CLIENT_ID}`;
                    collection.push(song);

                  
               });
           }
          // console.log(collection);
           return collection;
        })
        .catch((err ,caught): Observable<any> => {
            console.log(err.json())
            return Observable.throw(err.json().error)})     
    }
    
    request(options){
        let { url, method, query, paginate} = options;  
        
        let PAGINATE_PARAM='limit=50&linked_partitioning=1';
        let API_CLIENT_ID = 'client_id=5425e4d81a576ca003cc55795a98217f';
        let search =[];
        search.push(query);
        search.push(API_CLIENT_ID);
        method= method|| RequestMethod.Get;
        if(paginate) search.push(PAGINATE_PARAM);

        //console.log(search.join('&'));

        let req = new Request({
            url:url,
            method:method,
            search:search.join('&')
        });
    
        return this._http.request(req);
    }
}