import { Uuid } from "../../../classes/uuid";
import { Address } from "../../shared/address";

export class Warehouse {

    constructor(
        readonly id: Uuid,
        readonly name: string,
        readonly description: string,
        readonly address: Address
    ) {}
}
