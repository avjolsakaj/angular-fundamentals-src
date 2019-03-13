import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: `
    <form
      (ngSubmit)="handleSubmit(form.value, form.valid)"
      #form="ngForm"
      novalidate
    >
      <div>
        Passenger name:
        <input
          type="text"
          name="fullname"
          #fullname="ngModel"
          required="true"
          [ngModel]="detail?.fullname"
        />
        <div
          *ngIf="fullname?.errors?.required && fullname?.dirty"
          class="error"
        >
          Passenger name is required
        </div>
      </div>
      <div>
        Passenger Id:
        <input
          type="number"
          name="id"
          #id="ngModel"
          required="true"
          [ngModel]="detail?.id"
        />
        <div *ngIf="id?.errors?.required && id?.dirty" class="error">
          Passenger id is required
        </div>
      </div>
      <div>
        <!-- 
        <label>
        <input
        type="radio"
        name="checkedIn"
        [value]="true"
        [ngModel]="detail?.checkedIn"
        (ngModelChange)="toggleCheckIn($event)"
        />
        Yes
        </label>
        <label>
        <input
        type="radio"
        name="checkedIn"
        [value]="false"
        [ngModel]="detail?.checkedIn"
        (ngModelChange)="toggleCheckIn($event)"
        />
        No
        </label>
        -->
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />Yes</label
        >
      </div>
      <div *ngIf="form.value.checkedIn">
        Check in date:
        <input
          type="number"
          name="checkedInDate"
          [ngModel]="detail?.checkedInDate"
        />
      </div>

      <div>
        Luggage:
        <select name="baggage" [ngModel]="detail?.baggage">
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === detail?.baggage"
          >
            {{ item.value }}
          </option>
        </select>
        <!-- 
        <select name="baggage" [ngModel]="detail?.baggage">
        <option *ngFor="let item of baggage" [ngValue]="item.key">
        {{ item.value }}
        </option>
        </select>
        -->
      </div>
      <button type="submit" [disabled]="form.invalid">
        Update Passenger
      </button>
    </form>
  `
})
export class PassengerFormComponent {
  @Input() detail: Passenger;
  @Output() update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: "none",
      value: "No Baggage"
    },
    {
      key: "hand-only",
      value: "Hand Baggage"
    },
    {
      key: "hold-only",
      value: "Hold Baggage"
    },
    {
      key: "hand-hold",
      value: "Hold and hold Baggage"
    }
  ];

  constructor() {}

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkedInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      this.update.emit(passenger);
    }
  }
}
