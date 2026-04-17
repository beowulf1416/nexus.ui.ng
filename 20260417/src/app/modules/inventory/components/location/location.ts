import { Component, signal } from "@angular/core";
import { Field, form } from "@angular/forms/signals";
import { NotificationService } from "../../../../services/notification-service";
import { LocationService } from "../../services/location-service";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { WarehouseSelector } from "../warehouse-selector/warehouse-selector";
import { Warehouse } from "../../classes/warehouse";

@Component({
  selector: "app-location",
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    Field,
    WarehouseSelector,
  ],
  templateUrl: "./location.html",
  styleUrl: "./location.css",
})
export class Location {
  model_location = signal({
    location_id: "",
    warehouse_id: "",
    name: "",
    description: "",
  });

  component = {
    title: "",
    error: "",
    form_location: form(this.model_location),
  };

  constructor(
    private ns: NotificationService,
    private ls: LocationService,
  ) {}

  on_submit(event: Event) {
    event.preventDefault();
  }

  on_warehouse_selected(warehouses: Array<Warehouse>): void {
    console.info("on_warehouse_selected");
  }
}
