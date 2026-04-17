import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
import { Uuid } from './uuid';

export class Tenant {

    constructor(
        public readonly tenant_id: Uuid,
        public readonly name: string
    ) {}

    static default(): Tenant {
        return new Tenant(
            Uuid.nil(),
            'default'
        );
    }

    get is_default() {
        return this.tenant_id == Uuid.nil();
    }
}
