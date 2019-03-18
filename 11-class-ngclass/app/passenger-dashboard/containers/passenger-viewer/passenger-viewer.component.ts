import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

import "rxjs/add/operator/switchMap";

import { PassengerDashboardService } from "../../passenger-dashboard.service";

import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-viewer",
  styleUrls: ["passenger-viewer.component.scss"],
  template: `
    <div>
      <button (click)="goBack()">&lsaquo; Go Back</button>
      <passenger-form
        [detail]="passenger"
        (update)="onUpdatePassanger($event)"
      ></passenger-form>
    </div>
  `
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((data: Passenger) =>
        this.passengerService.getPassenger(data.id)
      )
      .subscribe((data: Passenger) => (this.passenger = data));
  }

  onUpdatePassanger(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe(
        (data: Passenger) =>
          (this.passenger = Object.assign({}, this.passenger, data))
      );
  }

  goBack() {
    this.router.navigate(["/passengers"]);
  }
}
