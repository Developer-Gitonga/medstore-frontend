import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.css'],
})
export class MedicineFormComponent implements OnInit {
  langs: string[] = ['Leukimia', 'Teams', 'Wendover'];
  data = [];

  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    disease: new FormControl(),
  });
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  url = 'https://medistore-apis.herokuapp.com/api/medicines/';
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
    console.log(data);
  }
}
