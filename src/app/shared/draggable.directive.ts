import { Directive, HostListener, EventEmitter, ElementRef, OnInit ,Renderer ,Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';

@Directive({
    selector: '[draggable]'
})
export class DraggableDirective implements OnInit {

    @Output('position') position = new EventEmitter();

    private mouseup = new EventEmitter();
    private mousedown = new EventEmitter<MouseEvent>();
    private mousemove = new EventEmitter<MouseEvent>();
    private mousedrag;
    private dragActive;
                
         
    @HostListener('document:mouseup', ['$event'])
    onMouseup(event) {
        
        if(this.dragActive){
            //this.mousemove = this.mouseup = null;
            this.dragActive = false;
        }
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        
        this.mousedown.emit(event);
        let offset = event.clientX - this.element.nativeElement.getBoundingClientRect().left;
        this.position.emit(this.parseToPercent(offset,this.element));
        
        
        //return false; // Call preventDefault() on the event
    }

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event) {
       
        if(this.dragActive){
            this.mousemove.emit(event);
            return false;
        }
    }
    
    constructor(private element: ElementRef,private render: Renderer) {   
            
            this.mousedrag = this.mousedown
                        .map(event => {
                            event.preventDefault();
                            this.dragActive = true;
                            let clickX = event.clientX - this.element.nativeElement.getBoundingClientRect().left;               
                            
                            //this.position.emit(click.left);
                           
                            this.move(clickX);
                            return {
                                x: clickX,
                                left: event.clientX,
                                top: event.clientY
                            };
                        })
                        .switchMap(downClick => this.mousemove
                                        .map(event => {
                                            let left = event.clientX  - this.element.nativeElement.getBoundingClientRect().left,
                                                width = this.element.nativeElement.offsetWidth,
                                                distance = Math.abs(event.clientX-downClick.left);

                                                

                                            if(distance<3){
                                                left = downClick.x;
                                            }
                                            if(left < 0){
                                                left = 0;
                                            }
                                            if(left > width){
                                                left = width;
                                            }
                                            return left;
                                        })
                                ).takeUntil(this.mouseup);
    }

    ngOnInit() {
        this.mousedrag.subscribe({
            next: position => {

                this.move(position);
                this.position.emit(this.parseToPercent(position,this.element));
            }
          
            
                 
        });
    }
    move(left:number){
            const lineEl= this.element.nativeElement.querySelector('.line'),
                   dotEl = this.element.nativeElement.querySelector('.dot');
             lineEl.style.width = left + "px";         
             dotEl.style.left = left + "px"
    }

    parseToPercent(pos: number, el: ElementRef) {
        return pos / el.nativeElement.offsetWidth * 100;
    }

}