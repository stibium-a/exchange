import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetHttpServiceService } from 'src/app/services/get-http-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  marker: boolean = true;

  eurExchange!: number;
  gbpExchange!: number;
  usdExchange!: number;

  defaultSelectValue: string = 'USD';
  exchangeRes!: any;
  calcMoneyResult: number = 0;
  now!: string;
  response: any;

  @Output()
  bgImage = new EventEmitter<any>();

  /* Array of currencies to compare */
  moneyArray = [
    {
      name: 'USD',
      exchangeValue: this.usdExchange
    },
    {
      name: 'EUR',
      exchangeValue: this.eurExchange
    },
    {
      name: 'GBP',
      exchangeValue: this.gbpExchange
    }
  ];

  /* Array of currencies to compare with rates from response */
  moneyArrayExchanged: { name: string, exchangeValue: number }[] = [];

  /* Array with rates and names of all currencies from response */
  responsedMoneyArray: { name: string, exchangeValue: number }[] = [];

  // constructor(private http: HttpClient) { }
  constructor(private getDayaServ: GetHttpServiceService) { }

  /*setting value of calculaitng =0 */
  ngOnChanges(changes: SimpleChanges): void {

    if (!this.marker) {
      this.calcMoneyResult = 0;
    }
  }

  ngOnInit(): void {

    this.search();

    let date = new Date().toLocaleDateString();
    this.now = date;
  }

  ngAfterViewInit() {

    this.moneyArrayExchanged = [];

    let select = document.getElementById('defMonSel');
    this.defaultSelectValue = (<HTMLSelectElement>select).value;

    this.setMoneyArrayExchanged();
  }

  search() {

    this.setMoneyArrayExchanged();
    this.sentRequestToAPI();
    this.setParametersFromResponse();
  }

  sentRequestToAPI() {
   return this.getDayaServ.sentRequestToAPI(this.defaultSelectValue);

    // return this.http.get(`https://v1.nocodeapi.com/coyote/cx/gptJqoisckiySVtY/rates?source=${this.defaultSelectValue}`);

  }

  setParametersFromResponse() {

    this.sentRequestToAPI().subscribe((response) => {
      this.response = response;

      this.eurExchange = this.response.rates.EUR;
      this.gbpExchange = this.response.rates.GBP;
      this.usdExchange = this.response.rates.USD;

      this.fillMoneyArray();
 
      this.moneyArrayExchanged.forEach((elem) => {
        let obj = this.responsedMoneyArray.filter((item) => item.name == elem.name);
        elem.exchangeValue = obj[0].exchangeValue;
      })
    })
  }

  /* Putting currencies datas to array */
  fillMoneyArray() {

    this.responsedMoneyArray = [];

    let rates = this.response.rates;

    for (let key in rates) {

      this.responsedMoneyArray.push(
        {
          name: key,
          exchangeValue: rates[key]
        }
      )
    }
  }

  setSelectDefault(selectDefault: HTMLSelectElement) {

    this.defaultSelectValue = selectDefault.value;
  }

  setSelectedIndex(selectDefault: HTMLSelectElement) {

    selectDefault.selectedIndex = -1;
  }


  /* Calculating amount of carencies exchange */
  calcMoneyFunc(MoneyInput: HTMLInputElement) {

    let select2 = document.getElementById('calcSelect');
    let serviceMoneyArray: { name: string, exchangeValue: number }[] = [];
    let cash = (<HTMLSelectElement>select2).value;

    serviceMoneyArray = this.responsedMoneyArray.filter((el) => el.name === cash);
    this.calcMoneyResult = +MoneyInput.value * serviceMoneyArray[0].exchangeValue;
  }

  /* Setting carrencies showing in options of calcSelect  */
  setMoneyArrayExchanged() {

    this.moneyArrayExchanged = this.moneyArray.filter((item) => item.name !== this.defaultSelectValue);
  }

  handleImage(selDefault: HTMLSelectElement) {

    this.bgImage.emit(selDefault.selectedIndex);
  }
}
