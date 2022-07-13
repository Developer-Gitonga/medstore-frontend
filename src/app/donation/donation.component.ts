import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

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

export class Diseases {
  constructor(public name: string, public id: number) {}
}
@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit {
  donors: string[] = ['2', 'Anonymous'];

  diseases: Diseases;
  id = '';

  calc: Calc;

  myForm = new FormGroup({
    donation_amount: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    disease_id: new FormControl(),
    disease: new FormControl(this.id),
    donor: new FormControl(),
    units_sold: new FormControl(0),
    units: new FormControl(0),
    set_price: new FormControl(),
    medicine_id: new FormControl(1),
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCalc();
    this.getDiseases();
    this.id = this.route.snapshot.params.id;
  }

  getDiseases() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.http
      .get<any>('https://medistore-apis.herokuapp.com/api/donations/' + this.id)
      .subscribe((response) => {
        this.diseases = response;
        console.log(response);
      });
  }

  url = 'https://medistore-apis.herokuapp.com/api/donation/';
  url2 = 'https://medistore-apis.herokuapp.com/api/calculation_units/';

  getText(data: any) {
    if (this.myForm.valid) {
      this.myForm.reset();
      this.router.navigate(['/donation-thanks']);
    }
    this.http
      .post(this.url, data)
      .toPromise()
      .then((data) => {});
    console.log(data);
    this.http
      .post(this.url2, data)
      .toPromise()
      .then((data) => {});
    console.log(data);
  }

  getCalc() {
    this.http
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/calculation_units_latest/'
      )
      .subscribe((response) => {
        this.calc = response;
        this.myForm.patchValue({
          disease_id: String(this.id),
          set_price: String(this.calc.set_price),
        });
      });
  }
}
