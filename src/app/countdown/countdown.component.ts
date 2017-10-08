import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit{
  ngOnInit(): void {
    this.startCountdown();
  }

  @Output() onDrecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init:number = null;
  public counter:number = 0; 

  constructor() { }

  startCountdown(){
    if(this.init && this.init > 0) {
      this.counter = this.init;
      this.doCountdown();

    }
  }

  doCountdown(){
    setTimeout(() =>{
      this.counter = this.counter - 1; 
      this.processCountdown();

    }, 1000)
  }

  processCountdown(){
    this.onDrecrease.emit(this.counter);
    console.log("counit is " , this.counter);
    if(this.counter == 0){
      this.onComplete.emit();
      console.log(" -- counter end --");
    } else {
      this.doCountdown();
    }
  }
}
