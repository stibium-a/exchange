import { Component, ViewChild } from '@angular/core';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  @ViewChild(ContentComponent) cont!: ContentComponent;
  
  // (ContentComponent) content: ContentComponent

  showPanelsProperty!: boolean;
  bgUrl: string = '';

  constructor() { }

  /*Showing calculate or rates panels */
  showPanelFunc(parameter: boolean) {
    this.showPanelsProperty = parameter;
  }

  /*selecting images of currencies to show on button*/
  setImg(index: any) {
    
    switch (index) {
      case 0:
        this.bgUrl = '../../../assets/images/united-states.png';
        
        break;
      case 1:
        this.bgUrl = '../../../assets/images/european-union.png';
        
        break;
      case 2:
        this.bgUrl = '../../../assets/images/united-kingdom.png';

        break;
      default:
        break;
    }

  }

}
