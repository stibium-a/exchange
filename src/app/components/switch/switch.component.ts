import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

  @Output()
  showPanelStatus = new EventEmitter<boolean>();

  statusCalc: boolean = true;
  statusChange: boolean = false;
  color!: boolean;

  @Input()
  flag: string ='';

  constructor() { }

  ngOnInit(): void {
        this.color = true;
        this.flag ='../../../assets/images/united-states.png';
  }

  showPanelFunc(indicator:string){
    indicator === 'calc' ? 
    (this.showPanelStatus.emit(this.statusChange), 
    this.color = true) : 
    (this.showPanelStatus.emit(this.statusCalc), 
    this.color = false);
  }

  setCalculateButtonBG(){
    
    return this.color ? true : false;
    
  }

  setExchangeButtonBG(){

    return !this.color ? true : false;
  }

}
