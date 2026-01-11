import { Uuid } from "../../classes/uuid";

export class Address {

    constructor(
        readonly street: string,
        readonly city: string,
        readonly state: string,
        readonly zip: string,
        readonly country_id: Uuid
    ) {}
}
