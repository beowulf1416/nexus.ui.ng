import { ChangeDetectorRef, Component } from "@angular/core";
import { NotificationService } from "../../../../services/notification-service";
import { WarehouseService } from "../../services/warehouse-service";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDialogRef } from "@angular/material/dialog";
import { WarehouseSelector } from "../warehouse-selector/warehouse-selector";

@Component({
  selector: "app-warehouse-selector-dialog",
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: "./warehouse-selector-dialog.html",
  styleUrl: "./warehouse-selector-dialog.css",
})
export class WarehouseSelectorDialog {
  constructor(
    private ns: NotificationService,
    private ws: WarehouseService,
    private cd: ChangeDetectorRef,
    private md: MatDialogRef<WarehouseSelector>,
  ) {}

  on_save(event: Event) {
    console.info("on_save");

    event.preventDefault();
  }

  on_cancel(event: Event) {
    console.info("on_cancel");

    event.preventDefault();
  }
}
