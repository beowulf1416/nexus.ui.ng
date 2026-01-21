import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  input,
  output,
} from "@angular/core";
import { Warehouse } from "../../classes/warehouse";
import { MatDialog } from "@angular/material/dialog";
import { WarehouseSelectorDialog } from "../warehouse-selector-dialog/warehouse-selector-dialog";

@Component({
  selector: "app-warehouse-selector",
  imports: [],
  templateUrl: "./warehouse-selector.html",
  styleUrl: "./warehouse-selector.css",
})
export class WarehouseSelector {
  multiple = input(false, { transform: booleanAttribute });
  selected = output<Array<Warehouse>>();

  constructor(
    private md: MatDialog,
    private cd: ChangeDetectorRef,
  ) {}

  show_dialog(event: Event): void {
    console.info("show_dialog");

    event.preventDefault();

    let dref = this.md.open(WarehouseSelectorDialog, {
      position: {
        right: "10px",
      },
    });
    dref.afterClosed().subscribe((warehouses: Array<Warehouse>) => {
      console.debug(warehouses);
    });
  }
}
