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

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css'],
})
export class UnitFormComponent implements OnInit {
  langs: string[] = ['1'];
  data = [];
  calc: Calc;

  id = '';
  medicines: Medicines;

  myForm = new FormGroup({
    units: new FormControl('', Validators.required),
    set_price: new FormControl('', Validators.required),
    medicine: new FormControl(),
    medicine_id: new FormControl(),
    units_sold: new FormControl(0),
    donation_amount: new FormControl(0),
    disease_id: new FormControl(1),
  });

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCalc();

    this.getMedicines();
    this.id = this.route.snapshot.params.id;
  }

  getMedicines() {
    this.id = this.route.snapshot.params.id;
    this.http
      .get<any>(
        'https://medistore-apis.herokuapp.com/api/medicine-id/' + this.id
      )
      .subscribe((response) => {
        this.medicines = response;
      });
  }
  url = 'https://medistore-apis.herokuapp.com/api/mediunits/';
  url2 = 'https://medistore-apis.herokuapp.com/api/calculation_units/';

  getText(data: any) {
    if (this.myForm.valid) {
      this.myForm.reset();
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
        console.log(this.calc);
        this.myForm.patchValue({
          medicine: String(this.medicines.id),
          medicine_id: String(this.medicines.id),
        });
      });
  }
}
