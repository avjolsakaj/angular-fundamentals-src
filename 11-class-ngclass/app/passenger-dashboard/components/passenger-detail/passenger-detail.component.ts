import {
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  EventEmitter
} from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-detail",
  styleUrls: ["passenger-detail.component.scss"],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name
        />
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>
      <div class="date">
        Check in date:
        {{
          detail.checkedInDate
            ? (detail.checkedInDate | date: "yMMMMd" | uppercase)
            : "No checked in"
        }}
      </div>
      <button (click)="toggleEdit()">
        {{ editing ? "Done" : "Edit" }}
      </button>
      <button (click)="onRemove()">
        Remove
      </button>
      <button (click)="goToPassenger()">
        View
      </button>
    </div>
  `
})
export class PassengerDetailComponent implements OnChanges, OnInit {
  @Input() detail: Passenger;
  @Output() remove: EventEmitter<Passenger> = new EventEmitter();
  @Output() edit: EventEmitter<Passenger> = new EventEmitter();
  @Output() view: EventEmitter<Passenger> = new EventEmitter();

  editing: boolean = false;

  constructor() {}

  ngOnChanges(changes: any): void {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  ngOnInit() {}

  onNameChange(value: string) {
    this.detail.fullname = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }

    this.editing = !this.editing;
  }

  onRemove() {
    this.remove.emit(this.detail);
  }

  goToPassenger() {
    this.view.emit(this.detail);
  }
}
