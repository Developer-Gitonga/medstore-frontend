import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

export class Medicines {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    public picture: string
  ) {}
}

export class Calc {
  constructor(
    public units_sold: Number,
    public units: Number,
    public set_price: Number,
    public donation_amount: Number,
    public medicine_id: Number,
    public disease_id: Number
  ) {}
}

export class unitsRemaining {
  constructor(public units_calculated: number) {}
}
export class currentPrice {
  constructor(public discounted_price: number) {}
}

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css'],
})
export class ShoppingFormComponent implements OnInit {
  medicines: Medicines;
  calc: Calc;

  id = '';
  currentRoute: string;
  units_remaining: unitsRemaining;
  current_price: currentPrice;
  myForm = new FormGroup({
    medicine: new FormControl(this.id),
    units_sold: new FormControl('', Validators.required),
    buyer: new FormControl('', Validators.required),
    units: new FormControl(0),
    donation_amount: new FormControl(0),
    set_price: new FormControl(),
    disease_id: new FormControl(1),
    medicine_id: new FormControl(),
  });

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMedicines();
    this.getCalc();
    this.getUnitsRemaining();
    this.getCurrentPrice();

    this.id = this.route.snapshot.params.id;
  }
  url = 'https://medistore-apis.herokuapp.com/api/purchase/';
  url2 = 'https://medistore-apis.herokuapp.com/api/calculation_units/';

  getText(data: any) {
    if (this.myForm.valid) {
      this.myForm.reset();
    }
    this.http
      .post(this.url, data)
      .toPromise()
      .then((data) => {});
    this.http
      .post(this.url2, data)
      .toPromise()
      .then((data) => {});
  }
  getMedicines() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.http
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/medicine-id/' + this.id
      )
      .subscribe((response) => {
        this.medicines = response;
      });
  }
  getCalc() {
    this.http
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/calculation_units_latest/'
      )
      .subscribe((response) => {
        this.calc = response;
        console.log(this.calc);
        this.myForm.patchValue({
          medicine: String(this.id),
          medicine_id: String(this.id),
          set_price: String(this.calc.set_price),
        });
      });
  }
  getUnitsRemaining() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.http
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
    this.http
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/discounted_price/' + this.id
      )
      .subscribe((response) => {
        this.current_price = response;
        console.log(response);
      });
  }
}
