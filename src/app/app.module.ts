
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.compotent';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing';

@NgModule({
    imports:[
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations:[
        AppComponent,
        HomeComponent
    ],
    providers:[],
    bootstrap:[AppComponent] 
})
export class AppModule {}