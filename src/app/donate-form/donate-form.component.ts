import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export class Diseases {
  constructor(public name: string, public id: number) {}
}

@Component({
  selector: 'app-donate-form',
  templateUrl: './donate-form.component.html',
  styleUrls: ['./donate-form.component.css'],
})
export class DonateFormComponent implements OnInit {
  diseases: Diseases[];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getDiseases();
  }

  getDiseases() {
    this.httpClient
      .get<any>('https://medistore-apis.herokuapp.com/api/disease/')
      .subscribe((response) => {
        this.diseases = response;
        // console.log(response);
      });
  }
}
