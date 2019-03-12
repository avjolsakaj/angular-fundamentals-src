import { Component, OnInit, ErrorHandler } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  template: `
    <div>
      <passenger-count [items]="passengers"></passenger-count>
      <div *ngFor="let passenger of passengers">
        {{ passenger.fullname }}
      </div>
      <passenger-detail
        *ngFor="let passenger of passengers"
        [detail]="passenger"
        (remove)="handleRemove($event)"
        (edit)="handleEdit($event)"
      >
      </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor() {}

  ngOnInit() {
    this.passengers = [
      {
        id: 1,
        fullname: "Stephen",
        checkedIn: true,
        checkedInDate: 1490742000000,
        children: null
      },
      {
        id: 2,
        fullname: "Rose",
        checkedIn: false,
        checkedInDate: null,
        children: [
          {
            name: "Avjol",
            age: 26
          },
          {
            name: "Amarildo",
            age: 20
          }
        ]
      },
      {
        id: 3,
        fullname: "James",
        checkedIn: true,
        checkedInDate: 14916060000000,
        children: null
      },
      {
        id: 4,
        fullname: "Louise",
        checkedIn: true,
        checkedInDate: 1488412800000,
        children: [
          {
            name: "Jessica",
            age: 1
          }
        ]
      },
      {
        id: 5,
        fullname: "Tina",
        checkedIn: false,
        checkedInDate: null,
        children: null
      }
    ];
  }

  handleRemove(event: Passenger) {
    this.passengers = this.passengers.filter((passenger: Passenger) => {
      return passenger.id !== event.id;
    });
  }

  handleEdit(event: Passenger) {
    this.passengers = this.passengers.map((passenger: Passenger) => {
      if (passenger.id === event.id) {
        passenger = Object.assign({}, passenger, event);
      }

      return passenger;
    });
  }
}

//#region Just for test

/*
      <!--
      <h3>Airline Passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [ngClass]="{
              'checked-in': passenger.checkedIn,
              'checked-out': !passenger.checkedIn
            }"
          ></span>
          {{ i }}: {{ passenger.fullname }}
        </li>
      </ul>
      <h3>Airline Passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [style.backgroundColor]="
              passenger.checkedIn ? '#2ecc71' : '#c0392b'
            "
          ></span>
          {{ i }}: {{ passenger.fullname }}
        </li>
      </ul>
      <h3>Airline Passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [ngStyle]="{
              backgroundColor: passenger.checkedIn ? '#2ecc71' : '#c0392b'
            }"
          ></span>
          {{ i }}: {{ passenger.fullname }}
        </li>
      </ul>
      -->
*/

//#endregion
