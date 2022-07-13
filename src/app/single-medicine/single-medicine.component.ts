import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

export class Medicines {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    public picture: string
  ) {}
}

export class unitsRemaining {
  constructor(public units_calculated: number) {}
}
export class currentPrice {
  constructor(public discounted_price: number) {}
}

@Component({
  selector: 'app-single-medicine',
  templateUrl: './single-medicine.component.html',
  styleUrls: ['./single-medicine.component.css'],
})
export class SingleMedicineComponent implements OnInit {
  medicine: Medicines;
  name = '';
  id = '';
  currentRoute: string;
  units_remaining: unitsRemaining;
  current_price: currentPrice;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMedicines();
    this.getUnitsRemaining();
    this.getCurrentPrice();
  }

  getMedicines() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.httpClient
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/medicine-id/' + this.id
      )
      .subscribe((response) => {
        this.medicine = response;
      });
  }
  getUnitsRemaining() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.httpClient
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/units_remaining/' + this.id
      )
      .subscribe((response) => {
        this.units_remaining = response;
        console.log(response);
      });
  }
  getCurrentPrice() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.httpClient
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/discounted_price/' + this.id
      )
      .subscribe((response) => {
        this.current_price = response;
        console.log(response);
      });
  }
}
