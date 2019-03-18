import { Component, OnInit, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";

import { Passenger } from "../../models/passenger.interface";
import { PassengerDashboardService } from "../../passenger-dashboard.service";

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
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)"
        (view)="handleView($event)"
      >
      </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit() {
    this.passengerService
      .getPassengers()
      .subscribe(
        (data: Passenger[]) => (this.passengers = data),
        e => console.log(e)
      );
  }

  handleRemove(event: Passenger) {
    this.passengerService.removePassenger(event).subscribe(
      (data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== event.id;
        });
      },
      e => console.log(e)
    );
  }

  handleEdit(event: Passenger) {
    this.passengerService.updatePassenger(event).subscribe(
      (data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      },
      e => console.log(e)
    );
  }

  handleView(event: Passenger) {
    this.router.navigate(["/passengers", event.id]);
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
