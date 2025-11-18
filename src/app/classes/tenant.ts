import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

export class Tenant {

    constructor(
        public readonly tenant_id: string,
        public readonly name: string
    ) {}

    static default(): Tenant {
        return new Tenant(
            NIL_UUID,
            'default'
        );
    }

    get is_default() {
        return this.tenant_id == NIL_UUID;
    }
}
