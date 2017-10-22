import { Component, Input, OnInit,OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy{
  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy():void {
    this.clearTimeout()
  }

  @Output() onDrecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init:number = null;
  public counter:number = 0; 
  private countdownTimerRef: any = null

  constructor() { }

  startCountdown(){
    if(this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();

    }
  }

  doCountdown(){
    this.countdownTimerRef = setTimeout(() =>{
      this.counter = this.counter - 1; 
      this.processCountdown();

    }, 1000)
  }
  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
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
